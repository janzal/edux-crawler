var util = require('util');

var BasicStorage = require('./basic-storage')

var ConsoleStorage = function() {
};

util.inherits(ConsoleStorage, BasicStorage);

/**
 * @override
 *
 * @param course
 * @param lecture
 * @param document
 * @param callback
 */
ConsoleStorage.prototype.addDocument = function(course, lecture, document, callback) {
    console.log('['+course+'] ['+lecture+'] '+document.name);
    callback(null);
};

module.exports = ConsoleStorage;

