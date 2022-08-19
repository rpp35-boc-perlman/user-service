// Data model class for database entities
const client = require('./db');

/**
 * @constructor
 * @param {string} primaryKey - The primary key in this models primary table
 * @param {string} table - The name of table this model represents
 */
class Model {
    constructor(primaryKey, table) {
        this.primaryKey = primaryKey,
        this.table = table,
        this.client = client
    }


    // global methods

    /**
     * @function - return all rows in the table up to the limit
     * @function
     * @param {number} limit -  The maximium number of items to be queried (defaults to 100)
     */
    async findAll (limit = 100) {
        const result = await this.client.query(`SELECT * FROM ${this.table} LIMIT ${limit}`)
        return result
    }

    /**
     *  @function - find a row in the table by a field and value
     * @param {string} field  - Name of column to query
     * @param {any} value - value to search for
     * @param {number} limit - Max number of items returned (defaults to 50)
     */
    async find (field, value, limit=50) {
        const result = await this.client.query(`SELECT * FROM ${this.table} WHERE ${field} = ${value} LIMIT ${limit}`)
        return result
    }

    /**
     *  @function - updates a row in the table
     * @param {string} id  - primary id
     * @param {object} data - data to update with
     */
    async findByIdAndUpdate (id, data) {
        const result = await this.client.query(`UPDATE ${this.table} SET ${data} WHERE ${this.primaryKey} = ${id}`)
        return result
    }

    /**
     *  @function - deletes a row in the table
     * @param {*} field - Name of column to query
     * @param {*} value - value to search for
     */
    async findAndDelete (field, value) {
        const result = await this.client.query(`DELETE FROM ${this.table} WHERE ${field} = ${value}`)
        return result
    }

}

module.exports = Model