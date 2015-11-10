import DS from 'ember-data';

export default DS.Model.extend({
  symbol       :  DS.attr('string'),
  name         :  DS.attr('string'),

  quotes      :   DS.attr(),

  chartTitle: Ember.computed('name', function () {
    return this.get('name').split(' Stock')[0] + ' OHLC & Volume (Last 30 Days)';
  }),

  candleStickData: Ember.computed('quotes', function () {
    var quotes = this.get('quotes');

    return quotes.map(function(quote, i) {
      return Object.keys(quote).map(key => quote[key]);
    }).reverse();
  }),

  quoteVolume: Ember.computed('quotes', function () {
    var quotes = this.get('quotes');

    return quotes.map(function(quote, i) {
      return [quote.date, quote.volume];
    }).reverse();
  }),

  candleStickOptions: Ember.computed('quotes', function () {
    return {
      xAxis: {
        type: 'datetime'
      },
      title: {
        text: null
      },
      tooltip: {
        crosshairs: true,
        shared: true
      },
      yAxis: [{
        labels: {
          align: 'right',
          x: -3
        },
        title: {
          text: 'OHLC'
        },
        height: '60%',
        lineWidth: 2
      }, {
        labels: {
            align: 'right',
            x: -3
        },
        title: {
            text: 'Volume'
        },
        top: '65%',
        height: '35%',
        offset: 0,
        lineWidth: 2
      }],
      series: [{
        type: 'candlestick',
        name: this.get('symbol'),
        data: this.get('candleStickData'),
      }, {
        type: 'column',
        name: 'Volume',
        data: this.get('quoteVolume'),
        yAxis: 1,
      }],
      plotOptions: {
        series: {
           dataLabels: {
              color: '#B0B0B3'
           },
           marker: {
              lineColor: 'grey'
           }
        },
        candlestick: {
           lineColor: 'black'
        }
      },
    };
  })

});
