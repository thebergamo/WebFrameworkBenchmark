var sys = require('sys'), 
    cluster = require('cluster'),
    numCPUs = require('os').cpus().length,
    Hapi = require('hapi');

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  var server = new Hapi.Server();
  server.connection({
    port: 8080
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply){
      reply('Hello World');
    }
  });

  server.start();
}
