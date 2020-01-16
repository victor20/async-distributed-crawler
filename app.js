
var moment = require('moment')
var myDate = new Date();
var myCoolDate = moment(myDate).format('LL');

console.log("\x1b[41m", 'old ' + myDate);
console.log("\x1b[0m", 'new ' + myCoolDate);
