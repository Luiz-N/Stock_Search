import Ember from 'ember';

export default Ember.Service.extend({

  contentArray: null,

  fetch: Ember.computed('init', function () {
    var service = this;
    $.ajax({
      url: 'https://whispering-sands-7333.herokuapp.com/company_list',
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
