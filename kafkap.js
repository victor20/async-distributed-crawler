const kafka = require('kafka-node');
const kafkac = require('./kafkac.js');
//const bp = require('body-parser');
//const config = require('./config');

const readline = require("readline");
var crawlert = require('./crawler.js');
//const crawlertest = new Crawlertest();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

try {
    const Producer = kafka.Producer;
    const client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'});
    const producer = new Producer(client);
    const kafka_topic = 'url-topic';
    console.log(kafka_topic);


    producer.on('ready', async function() {
        crawlert.on('urlparsed', function(link) {
            let payloads = [
                {
                    topic: kafka_topic,
                    messages: link
                }
            ];

            let push_status = producer.send(payloads, (err, data) => {
                if (err) {
                    //console.log('[kafka-producer -> '+kafka_topic+']: broker update failed');
                } else {
                    //console.log('[kafka-producer -> '+kafka_topic+']: broker update success');
                }
            });
        });

    });

    producer.on('error', function(err) {
        console.log(err);
        console.log('[kafka-producer -> '+kafka_topic+']: connection errored');
        throw err;
    });
}
catch(e) {
    console.log(e);
}