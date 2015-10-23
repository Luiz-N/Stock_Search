# Stock_Search

This Application allows a user to see the previous 3 months perfomance of a US publicly traded stock. It is an ember app with a simple Sinatra backend and a mongodb database.

## Setup:

1. Clone repo and navigate into directory
2. run `bundle install` to setup necessary gems
3. Make sure you have mongo setup correctly on your computer then run `sudo mongod` to stand up a mongo db on port `27017`
4. Navigate into the sinatraApp directory and run `ruby backend.rb`. This will read the local csv files containg all the company names and symbols, seed them into your database, and then setup a local sinatra server at `localhost:4567`.
5. Navigate into the emberApp directory and run `npm install` then `bower install` and finally `ember server` to stand up the ember server on `localhost:4200`. If you navigate there you should find the working application.

## Notes

The backend is simply used to populate the ember selectize dropdown component via an ajax service call on first load. Stock History data is made from the client through a custom adapter that uses the free [Quandl API](https://www.quandl.com/docs/api?json#retrieve-data).
