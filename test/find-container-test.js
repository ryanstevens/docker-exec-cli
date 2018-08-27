var tap = require('tap');
var container = require('../src/find-container');

tap.test('find-container default return', function(t) {

  t.ok(container);
  container('garbage-image-names').then(function(ids) {
    t.ok(ids.length === 0, 'Should be empty');
    t.end();
  }, function(err) {
    
  });

});