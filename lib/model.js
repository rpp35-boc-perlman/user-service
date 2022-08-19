// Data model class for database entities
const pg = require('pg')

/**
 * @constructor
 * @param {string} primaryKey - The primary key in this models primary table
 * @param {string} table - The name of table this model represents
 */
class Model {
    constructor(primaryKey, table) {
        this.primaryKey = primaryKey,
        this.table = table
    }


    // global methods

    /**
     * @function
     * @param {number} limit -  The maximium number of items to be queried (defaults to 100)
     */
    findAll (limit = 100) {

    }

    /**
     *
     * @param {string} field  - Name of column to query
     * @param {any} value - value to search for
     * @param {number} limit - Max number of items returned (defaults to 50)
     */
    find (field, value, limit=50) {

    }

    /**
     *
     * @param {string} id  - primary id
     * @param {object} data - data to update with
     */
    findByIdAndUpdate (id, data) {

    }

    /**
     *
     * @param {*} field - Name of column to query
     * @param {*} value - value to search for
     */
    findAndDelete (field, value) {

    }

}

module.exports = Model