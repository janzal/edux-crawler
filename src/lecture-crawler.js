var async = require('async');
var cheerio = require('cheerio');
var pdftotext = require('pdf-text-extract')

var request = require('request').defaults({
    jar: true
});

request.cookie('DokuWiki=invnhq2qqjhkjou0re3ku14s75; Domain=edux.fit.cvut.cz');
request.cookie('DW6666cd76f96956469e7be39d750cc7d9=emFsb3VqYTQ%3D%7C1%7Cd3dNOVlldVpBRFlQTW9jU002dGdhdz09; Domain=edux.fit.cvut.cz');

var url = require('url');

/**
 *
 * @param lecture
 * @param $storage {BasicStorage}
 * @constructor
 */
var LectureCrawler = function(course, lecture, storage) {
    this.course_ = course;
    this.lecture_ = lecture;

    this.$storage = storage;
};

LectureCrawler.prototype.extractAllDocuments_ = function(lecture_body, callback) {
    $ = cheerio.load(lecture_body);

    var links = [];

    $('a[href$=pdf]').each(function(i, elem) {
        links.push({
            name: $(this).text(),
            url: $(this).attr('href')
        });
    });

    var documents = [];

    async.each(links, function(link, callback) {
        var resource_url = url.resolve('http://edux.fit.cvut.cz/', link.url);

        console.log('Downloading resource ' + resource_url);

        request(resource_url, function(err, response, body) {
            if(err) {
                return callback(err);
            }

            if(response.statusCode === 200) {
                var document = {
                    name: link.name,
                    url: resource_url,
                    course: this.course_,
                    lecture: this.lecture_,
                    content: body
                };

                documents.push(document);
                return callback();
            }

            return callback(new Error('Unknown status code, while fetching file '
                + link.url
                + '. Code: ' + response.statusCode));
        }.bind(this));

    }, function(err) {
        return callback(err, documents);
    });
};

LectureCrawler.prototype.fetch = function(callback) {
    var lecture_url = 'http://edux.fit.cvut.cz/courses/'+this.course_+'/lectures/'+this.lecture_+'/start';

    request.get(lecture_url, function(err, response, body) {
        if(err) {
            return callback(err);
        }

        if(response.statusCode === 200) {
            return this.extractAllDocuments_(body, function (err, documents) {
                if(err) {
                    return callback(err);
                }

                return async.each(documents,
                    this.$storage.addDocument.bind(this.$storage, this.course_, this.lecture_),
                    callback);

            }.bind(this));
        }

        return callback(new Error('Unknown code has been returned: '+response.statusCode));
    }.bind(this));
};

module.exports = LectureCrawler;