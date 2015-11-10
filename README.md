# Stock_Search

This branch is a major re-factor of the older master branch and corrects some key requirements. The stack is the same except this time the much more reliable yahoo finance api is used in the backend instead of hacking it from the client side.  The setup instructions are the same however a new gem is added so a fresh bundle install is required. See the "Changes" section below for for more details on the corrections/enhancements.

## Setup:

1. Clone repo and navigate into directory
2. run `bundle install` to setup necessary gems
3. Make sure you have mongo setup correctly on your computer then run `sudo mongod` to stand up a mongo db on port `27017`
4. Navigate into the sinatraApp directory and run `ruby backend.rb`. This will read the local csv files containg all the company names and symbols, seed them into your database, and then setup a local sinatra server at `localhost:4567`.
5. Navigate into the emberApp directory and run `npm install` then `bower install` and finally `ember server` to stand up the ember server on `localhost:4200`. If you navigate there you should find the working application.

## Changes

This branch makes a lot of architectural improvements and is a much more robust solution. More importantly it follows the instructions of the assignment more closely.

### Use Case 1: Symbol Search

  This branch, like the older one, still makes a service call on first load to a custom endpoint that returns all possible company symbols and names. The older version however used ember-selectize to dynamically show company query results which violated the "don't use additional jquery plugins" rule. This branch uses a standard input box whose value is monitored by [a javascript RegExp filter and updates computed properties.](https://github.com/Luiz-N/Stock_Search/blob/refactor/emberApp/app/components/symbol-search/component.js) These computed properties dynamiclly update an interactive table whose rows can be clicked on to update the chart. (and route/URL)
  
  <p align="center">
    <img src="http://f.cl.ly/items/1X111A052b3h3423383B/Image%202015-11-09%20at%2011.32.29%20PM.png"/>
  </p>
  
  
### Use Case 2: Price History Chart

  The previous branch made all historical quote queries from the client side through a custom adapter to an external API which was ugly, inefficient, and basically a hack. The backend now has [a /companies/:symbol endpoint](https://github.com/Luiz-N/Stock_Search/blob/refactor/sinatraApp/backend.rb) which queries the host's database for historical quotes. If the database already has the latest 30 days of quotes for a company then the collection is immediately passed to the client in the expected format for ember-data. Otherwise the yahoo finance api is queried from the backend to update the db before passing the results to the client.


![alt-tag](http://f.cl.ly/items/2o012V0A431Q2n2T3K1t/Image%202015-11-09%20at%2011.23.37%20PM.png)
