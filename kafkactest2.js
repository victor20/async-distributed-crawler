const EventEmitter = require('events');
const kafkacemitter = new EventEmitter();
module.exports = kafkacemitter;

const kafka = require('kafka-node');
//const bp = require('body-parser');
//const config = require('./config');

try {
    const Consumer = kafka.Consumer;
    const client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'});
    let consumer = new Consumer(
        client,
        [{ topic: "url-upstream-two-topic", partition: 0 }],
        {
            //autoCommit: true,
            //fetchMaxWaitMs: 1000,
            //fetchMaxBytes: 1024 * 1024,
            //encoding: 'utf8',
            fromOffset: 'latest'
        }
    );
    consumer.on('message', async function(message) {
        //console.log('here');
        console.log(
            'kafka-> ',
            message.value,
            'offset ' + message.offset,
            'partition ' + message.partition
        );
    })
    consumer.on('error', function(err) {
        console.log('error', err);
    });
}
catch(e) {
    console.log(e);
}