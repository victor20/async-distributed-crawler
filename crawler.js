var Crawler = require("crawler");
var kafkac = require('./kafkac.js');

const EventEmitter = require('events');
const crawleremitter = new EventEmitter();
module.exports = crawleremitter;

var c = new Crawler({
    maxConnections : 10,
    skipDuplicates : true,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            //$.url
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server

            console.log($("title").text());
            //console.log($.html());
            //console.log($("div"));
            //console.log($("link"));
            //console.log($("a"));
            //console.log($('a[href*="/test/"]').attr('href'));
            //console.log($('a[href]').attr('href'));
            //console.log($('a[href$=".se"]'));

            $("a").each((i, el) => {
                const link = $(el).attr('href')
                //console.log(link);
                //Send link to kafka
                //c.queue(link);
                crawleremitter.emit('urlparsed', link);
            });


            //var links = $("a");
            //console.log(links);


        }
        done();
    }
});

kafkac.on('urlrecivedfromback', function(link) {
    c.queue(link);
});

// Queue just one URL, with default callback
c.queue('http://www.profilform.se');

