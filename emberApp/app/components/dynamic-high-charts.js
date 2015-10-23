import Ember from 'ember';
import EmberHighChartsComponent from 'ember-highcharts/components/high-charts';

export default EmberHighChartsComponent.extend({

  contentDidChange: Ember.observer('chartOptions', function() {
    // add redraw logic here. ex:
    var chart = this.get('chart');
    var chartOptions = this.get('chartOptions');
    var series = chartOptions.series[0];
    chart.series[0].update(series, false);
    chart.redraw();
  })

});
