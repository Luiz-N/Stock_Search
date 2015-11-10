import Ember from 'ember';

export default Ember.Component.extend({

  filter:             '',
  allCompanies:       Ember.inject.service('company-list'),
  companySorting:     ['name'],
  sortedCompanies:    Ember.computed.sort('allCompanies.contentArray', 'companySorting'),
  filteredCompanies:  Ember.computed(
    'sortedCompanies.[]',
    'filter',
    function () {
      var filter = this.get('filter');
      var filterRegEx = new RegExp(filter, 'gi');
      if (filter.length >= 3) {
        return this.get('sortedCompanies').filter(
          company => company.name.match(filterRegEx)
        );
      }
    }
  ),

  companiesFound: Ember.computed.and('filter', 'filteredCompanies.length'),

  didInsertElement: function () {
    this.get('allCompanies.fetch');
  },

  actions: {
    updateModel: function(params) {
      var symbol = params.symbol;
      if (symbol) {
        this.sendAction('updateModel', symbol);
        this.$('tr').removeClass('info');
        this.$('tr:has(td:last:contains('+params.name+'))').addClass('info');
      }
    }
  }

});
