var async = require('async');
var cheerio = require('cheerio');
var request = require('request');

var LectureCrawler = require('./lecture-crawler');

var EduxCrawler = function(courses, storage) {
    this.courses_ = courses;

    this.$storage = storage;
};

EduxCrawler.prototype.crawlLecture_ = function(course, lecture, callback) {
    var lectureCrawler = new LectureCrawler(course, lecture, this.$storage);
    lectureCrawler.fetch(callback);
};

EduxCrawler.prototype.fetchCourse = function(course, callback) {
    var lectures_urls = [];

    var lectures = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'];

    async.each(lectures,
        this.crawlLecture_.bind(this, course),
        callback
    );
};

EduxCrawler.prototype.fetchCourses = function(callback) {
    async.each(this.courses_, this.fetchCourse.bind(this), callback);
};

module.exports = EduxCrawler;