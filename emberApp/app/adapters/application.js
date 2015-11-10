import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: 'http://localhost:4567',
  primaryKey: function() {
    return 'symbol';
  }
});
