require 'csv'
require 'rubygems'
require 'sinatra'
require 'mongo'
require 'json/ext' # required for .to_json

configure do
  db = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'database')  
  set :companies_collection, db[:companies]
end

companies = []

CSV.foreach(File.path("companyLists/amex.csv"), {:headers => true}) do |row|
    companies << {:symbol => row[0], :name => row[1]}
end

CSV.foreach(File.path("companyLists/nasdaq.csv"), {:headers => true}) do |row|
    companies << {:symbol => row[0], :name => row[1]}
end

CSV.foreach(File.path("companyLists/nyse.csv"), {:headers => true}) do |row|
    companies << {:symbol => row[0], :name => row[1]}
end

# Remove symbols with ^
companies.each { |x| x[:symbol] = x[:symbol].split(/[\^,.]/)[0]}
# Remove duplicates
companies.uniq! { |x| x[:name] }
settings.companies_collection.drop
settings.companies_collection.insert_many(companies)


get '/company_list' do
	response['Access-Control-Allow-Origin'] = '*'
	settings.companies_collection.find().to_a.to_json
end