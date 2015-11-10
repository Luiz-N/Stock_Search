require 'csv'
require 'rubygems'
require 'sinatra'
require 'mongo'
require 'json/ext' # required for .to_json
require 'stock_quote'
# require 'pry'

configure do
  db = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'stocks')  
  db[:companies].drop
  set :companies, db[:companies]
end

companies_array = []

CSV.foreach(File.path("companyLists/amex.csv"), {:headers => true}) do |row|
    companies_array << {:symbol => row[0], :name => row[1]}
end

CSV.foreach(File.path("companyLists/nasdaq.csv"), {:headers => true}) do |row|
    companies_array << {:symbol => row[0], :name => row[1]}
end

CSV.foreach(File.path("companyLists/nyse.csv"), {:headers => true}) do |row|
    companies_array << {:symbol => row[0], :name => row[1]}
end

# Remove symbols with ^
companies_array.each { |company| 
	company[:symbol] = company[:symbol].split(/[\^,.]/)[0]
	company[:_id] = company[:symbol]
}
# Remove duplicates
companies_array.uniq! { |company| company[:_id] }
# Seed DB
settings.companies.insert_many(companies_array)


get '/companies/:symbol' do |symbol|
	response['Access-Control-Allow-Origin'] = '*'
	company = settings.companies.find({_id: symbol}).projection({_id: 0}).find_one_and_update(
		"$set" => { :last_update => Date.today.to_time.to_i }
	)

	if company[:last_update] != Date.today.to_time.to_i
		raw_quotes = StockQuote::Stock.json_quote(
			company[:symbol], 
			Date.today - 30, Date.today, 
			['Date', 'Open', 'High', 'Low', 'Close', 'Volume']
		)
		company[:quotes] = raw_quotes["quote"].map do |quote|
			new_hash = {}
  		quote.each_pair do |k,v|
   			new_hash.merge!({k.downcase => v.to_f.round(2)}) 
	  	end
	  	new_hash['date'] = Date.parse(quote['Date']).to_time.to_i * 1000
	  	new_hash
		end

		settings.companies.update_one(
			{_id: symbol},
			{
				"$set" => {
					quotes: company[:quotes]
				}
			}
		)
	end
	return {
		data: {
			id: company[:symbol],
			type: 'company',
			attributes: {
				name: company[:name],
				symbol: company[:symbol],
				quotes: company[:quotes]
			}
		}
	}.to_json

end

get '/company_list' do
	response['Access-Control-Allow-Origin'] = '*'
	settings.companies.find().projection({_id: 0}).to_a.to_json
end
