import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel (params) {
    if (!params.state.params.dashboard) {
      this.transitionTo('dashboard', 'AAPL');
    }
  }
});
