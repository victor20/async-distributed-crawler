var Crawler = require("crawler");
var kafkac = require('./kafkac.js');

const domain = 'https://profilform.se';

const EventEmitter = require('events');
const crawleremitter = new EventEmitter();
module.exports = crawleremitter;

var regex = new RegExp(domain)

var c = new Crawler({
    maxConnections : 10,
    skipDuplicates : true,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error) {
            console.log(error);
        } else {
            var $ = res.$;
            //$.url
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server

            //console.log($("title").text());
            if(res.$) {
                $("a").each((i, el) => {
                    const link = $(el).attr('href')
                    //Send link to kafka
                    console.log(link);
                    console.log(regex.test(link));

                    if(regex.test(link)) {
                        crawleremitter.emit('urlparsed', link);
                    }
                });
            }
        }
        done();
    }
});

kafkac.on('urlrecivedfromback', function(link) {
    c.queue(link);
});

// Queue just one URL, with default callback
c.queue(domain);

