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
        fromOffset: 'latest'
    }

    const ConsumerGroup = kafka.ConsumerGroup;

    //const client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'});

    var consumerGroup = new ConsumerGroup(options, 'url-upstream-two-topic');

    consumerGroup.on('message', async function(message) {
        messageValue = message.value
        //console.log('here');


        console.log(
            'kafka-> ',
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