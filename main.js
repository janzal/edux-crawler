var EduxCrawler = require('./src/edux-crawler');
var path = require('path');


var ConsoleStorage = require('./src/storages/console-storage.js');
var FileStorage = require('./src/storages/file-storage.js');

var eduxCrawler = new EduxCrawler([
    'BI-VZD',
    'BI-PA1',
    'BI-PA2',
    'BI-ZUM',
    'BI-PPR',
    'BI-PRP'
], new FileStorage(path.join(__dirname, 'output')));

eduxCrawler.fetchCourses(console.log);