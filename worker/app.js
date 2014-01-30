var connection = require('amqp').createConnection({
    'url':rabbitUrl()
});

connection.on('ready', function () {
    console.log('connected to RabbitMQ');
    var e = connection.exchange('node-ack-topic', {
        type:'topic'
    });
    createQ(e);
});


function createQ(e) {
    var q = connection.queue('CFWorkerQueue', function () {
        //Bind to exchange w/ bindingKey/channel 'tasks'
        q.bind(e, 'tasks');
        q.on('queueBindOk', function () {
            subscribeToQ(q);
        });
    });
}

function subscribeToQ(q) {
    q.subscribe({
        ack:true
    }, function (task, message, headers, deliveryInfo) {
        doTask(q, task, deliveryInfo.redelivered);
    });
}

function doTask(q, task, redelivered) {
    //default time for task 1 second
    var taskTime = 1000;

    setTimeout(function () {
        console.log(task);
        q.shift(); // MAKE SURE TO DO SHIFT (to send ACK)
    }, taskTime);
}

function rabbitUrl() {
  return process.env.RABBITMQ_URL || 'amqp://localhost';
}