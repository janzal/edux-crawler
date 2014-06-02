/**
 * BasicStorage is just interface for another fucking useful storages, yo
 *
 * @interface
 *
 * @constructor
 */
var BasicStorage = function() {
};

/**
 *
 * @param course
 * @param lecture
 * @param document
 * @param callback
 * @returns {*}
 */
BasicStorage.prototype.addDocument = function(course, lecture, document, callback) {
   return callback(new Error('addDocument is not implemented'))
};

module.exports = BasicStorage;

