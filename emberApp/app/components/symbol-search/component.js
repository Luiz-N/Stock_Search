import Ember from 'ember';

export default Ember.Component.extend({

  symbolInput: null,
  serviceCall: Ember.inject.service('company-list'),

  didInsertElement: function () {
    this.get('serviceCall.fetch')
  },

  contentArray: Ember.computed('serviceCall.contentArray', function () {
    return this.get('serviceCall.contentArray');
  }),


  actions: {
    updateModel: function(params) {
      var symbolInput = this.get('symbolInput.symbol');
      if (symbolInput) {
        this.sendAction('updateModel', symbolInput);
      }
    }
  }

});
