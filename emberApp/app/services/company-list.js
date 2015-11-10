import Ember from 'ember';

export default Ember.Service.extend({

  contentArray: null,

  fetch: Ember.computed('init', function () {
    var service = this;
    $.ajax({
      url: 'http://localhost:4567/company_list',
      type: 'GET',
      accepts: 'application/json',
      success: function(data) {
         service.set('contentArray', JSON.parse(data));
         console.log('DEBUG: GET Enquiries OK');
      },
      error: function() {
         console.log('DEBUG: GET Enquiries Failed');
      }
      });
  }),



});
