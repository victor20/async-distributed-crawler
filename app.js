
var moment = require('moment')
var myDate = new Date();
var myCoolDate = moment(myDate).format('LL');

console.log('old ' + myDate);
console.log('new ' + myCoolDate);
