import Ember from 'ember';
import EmberHighChartsComponent from 'ember-highcharts/components/high-charts';

export default EmberHighChartsComponent.extend({

  contentDidChange: Ember.observer('chartOptions', function() {
    // add redraw logic here. ex:
    var chart = this.get('chart');
    var chartOptions = this.get('chartOptions');
    var candleStickData = chartOptions.series[0];
    var volumeData = chartOptions.series[1];
    chart.series[0].update(candleStickData, false);
    chart.series[1].update(volumeData, false);
    chart.redraw();
  })

});
