
<h1>A Node.js app that shows the power for RabbitMQ's Work-queue</h1>

There are two apps in this project. A producer and a consumer/worker app. This project shows you how RabbitMQ <b>smartly</b> schedules tasks sent by a producer to various (Node.js) workers. This project also shows <b>'ack'</b> (acknowledgement) feature.

Specifically it shows:
<ul>
<li>RabbitMQ schedules tasks in round-robin fashion among workers
<li> W/ ACK, If one of the worker takes long time (long job or is hanging), RabbitMQ spreads the work to other AVAILABLE workers.
<li>W/ ACK, If one of the worker dies <i>while processing</i> a job, RabbitMQ  <b>reschedules</b> the job.
</li>
<li>Most importantly, how you can implement all these w/ just few lines of code!
</li>
</ul>

<h4>How to get the application running on Localhost</h4>

<ul>
<li>
Install <a href='http://www.rabbitmq.com/download.html' target='_blank'>RabbitMQ</a>
</li>
<li>
Simply open at least 2 terminal windows for workers and 1 more for producer.
</li>
<li>
cd to rabbitworker/worker in worker terminals, do `npm install` and run `node app.js`. And keep them running.
</li>
<li>
cd to rabbitworker/producer  do `npm install` and run `node app.js`
</li>
<li>
Check the console.log outputs in worker terminal windows.
</li>
<li>
 Play around w/ `doTask` function in `worker/app.js` to simulate long jobs and worker-crashes
</li>
</ul>




