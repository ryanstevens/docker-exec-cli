var tap = require('tap');
var parse = require('../src/parse-ps');

tap.test('can parse docker stdout with running containers', function(t) {

  const stdout = 
`CONTAINER ID        IMAGE                           COMMAND                  CREATED             STATUS              PORTS                      NAMES
81e81f380948        project-lighthouse_server_api   "/docker-entrypoint"     36 minutes ago      Up 36 minutes       0.0.0.0:8000->8000/tcp     project-lighthouse_server_api_1
2b64d3153c37        project-lighthouse_mongo        "docker-entrypoint..."   36 minutes ago      Up 36 minutes       0.0.0.0:27017->27017/tcp   project-lighthouse_mongo_1
140c0d2bcebd        redis                           "docker-entrypoint..."   2 hours ago         Up 36 minutes       0.0.0.0:6379->6379/tcp     project-lighthouse_redis_1
7c0410c64a19        project-lighthouse_client_web   "npm start"              2 hours ago         Up 36 minutes       0.0.0.0:3000->3000/tcp     project-lighthouse_client_web_1`;

  t.ok(parse);
  const lines = parse(stdout);
  t.equal(lines.length, 4, 'there should be four running containers');
  t.equal(lines[0].id, '81e81f380948', 'first container should have a id of 81e81f380948');
  t.equal(lines[0].image, 'project-lighthouse_server_api');
  t.equal(lines[1].id, '2b64d3153c37', 'second container should have a id of 2b64d3153c37');
  t.equal(lines[1].image, 'project-lighthouse_mongo');
  t.end();
});

tap.test('can parse docker stdout with no running containers', function(t) {

  const stdout = 'CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES';

  const lines = parse(stdout);
  t.equal(lines.length, 0, 'there should no containers');
  t.end();
});


tap.test('can run but not fail on gargabe stdout', function(t) {

  t.equal(parse(null).length, 0);
  t.equal(parse('').length, 0);
  t.equal(parse('123').length, 0);

  t.equal(parse('123\n3454').length, 0, 'there should no containers, even if there is a line break');
  t.end();
});