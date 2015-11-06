import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: 'https://www.quandl.com',
  namespace: 'api/v3/datasets/EOD/',

  urlForFindRecord: function(id) {
    if (id) {
      var url = this._super();
      var todayDate = moment().format('YYYY-MM-DD');
      var monthAgoDate = moment().subtract(3,'month').format('YYYY-MM-DD');
      return url + id.toUpperCase() + '.json?start_date='+monthAgoDate+'&end_date='+todayDate+'&api_key=b62svkeDHjV3EcEvFcFM';
    }
  },
});
