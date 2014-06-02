var fs = require('fs');
var path = require('path');
var util = require('util');
var mkpath = require('mkpath');

var BasicStorage = require('./basic-storage')

/**
 * Basic file-based document storage
 *
 * @implements {BasicStorage}
 * @param path
 * @param course
 * @param lecture
 * @constructor
 */
var FileStorage = function(path) {
    this.path_ = path;
};

util.inherits(FileStorage, BasicStorage);

/**
 * @override
 *
 * @param course
 * @param lecture
 * @param document
 * @param callback
 */
FileStorage.prototype.addDocument = function(course, lecture, document, callback) {
    var file_name = path.join(this.path_, course, lecture, document.name);

    mkpath.sync(path.dirname(file_name));

    console.log('Saving file ' + file_name);

    fs.writeFile(file_name, document.content, callback);
};

module.exports = FileStorage;

