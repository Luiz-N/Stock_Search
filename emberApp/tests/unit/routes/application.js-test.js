import { moduleFor, test } from 'ember-qunit';

moduleFor('route:application.js', 'Unit | Route | application.js', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  var route = this.subject();
  assert.ok(route);
});
