const EventEmitter = require('events');
const kafkacemitter = new EventEmitter();
module.exports = kafkacemitter;

const kafka = require('kafka-node');
//const bp = require('body-parser');
//const config = require('./config');

try {
    var options = {
        kafkaHost: 'localhost:9092',
        groupId: 'groupName',
        fromOffset: 'latest',
        //partition: '0'
        //protocol: [{"url-upstream-two-topic": ["1"]}]
    }

    const ConsumerGroup = kafka.ConsumerGroup;

    //const client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'});
    //var topics = [{ topic: 'url-upstream-two-topic', partition: 1 }];

    var consumerGroup = new ConsumerGroup(options, 'url-upstream-zero-topic');

    consumerGroup.on('message', async function(message) {
        messageValue = message.value
        //console.log('here');


        console.log(
            'kafka-> ',
            'topic ' + message.topic,
            messageValue,
            'offset ' + message.offset,
            'partition ' + message.partition
        );

        kafkacemitter.emit('urlrecivedfromback', messageValue);
    })
    consumerGroup.on('error', function(err) {
        console.log('error', err);
    });
}
catch(e) {
    console.log(e);
}