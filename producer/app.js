var connection = require('amqp').createConnection({
  'url': rabbitUrl()
});

connection.on('ready', function() {
  console.log('connected to RabbitMQ');

  //Connect to topic exchange
  var e = connection.exchange('node-ack-topic', {
    type: 'topic'
  });

  //publish 20 tasks
  publishTasks(e, 20);
});

function publishTasks(e, numberOfTasks) {
  //Generate task's batchName
  var batchName = require('moniker').choose();

  for(var i = 0; i < numberOfTasks; i++) {
    console.log('sending ' + (i + 1) + ' ...');
    //publish
    e.publish('tasks', {
      batchName: batchName,
      taskName: 'Task# ' + (i + 1)
    });
  }
  console.log('done. ');
}



function rabbitUrl() {
  return process.env.RABBITMQ_URL || 'amqp://localhost';
}