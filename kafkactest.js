const EventEmitter = require('events');
const kafkacemitter = new EventEmitter();
module.exports = kafkacemitter;

var kafka = require("kafka-node"),
    Consumer = kafka.Consumer,
    client = new kafka.KafkaClient(),
    consumer = new Consumer(client, [{ topic: "url-upstream-two-topic", partition: 0 }], {
        autoCommit: false,
        fromOffset: 'latest'
    });

consumer.on("message", function(message) {
    var messageValue = message.value;
    console.log("URL recived from back: " + messageValue);
    //console.log("Queued: " + messageValue.value);
    //kafkacemitter.emit('urlrecivedfromback', messageValue);

});