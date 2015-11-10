import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    var symbol = params.company_id || 'AAPL';
    return this.store.find('company', symbol.toUpperCase());
  },
  setupController (controller, model) {
    controller.set('model', model);
  },
  actions: {
    updateModel: function (searchSymbol) {
       this.transitionTo("dashboard", searchSymbol.toUpperCase());
    }
  }
});
