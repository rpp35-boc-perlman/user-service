// Data model class for database entities
const client = require('./db');
const color = require('colors');

const passedClient = client

/**
 * @constructor
 * @param {string} primaryKey - The primary key in this models primary table
 * @param {string} table - The name of table this model represents
 * @param {instance} client - instance of PG client or pool
 */
class Model {
    constructor(primaryKey, table, client = passedClient) {
        this.primaryKey = primaryKey,
        this.table = table,
        this.client = client
    }

    // utilty methods

    /**
     * @function - returns keys from given object (colum names)
     * @returns - array
     * @param {object} data - object
     */
    getColumns (data) {
        const keys = Object.keys(data)
        return keys
    }

    /**
     * @function - returns the values from given object (row values)
     * @returns  array
     * @param {object} data - object
     */
    getValues (data) {
        const values = Object.values(data)
        return values
    }

    /**
     * @function - returns an array of placeholder for use in SQL queies
     * @returns - array
     * @param {*} data - object containing values to be inserted
     */
    generatePlaceholders (data) {
        return Object.keys(data).map( (value, index) => {
            return `$${index + 1}`
        })
    }

    /**
     * @function - return array of key pairs formated like column1 = value1, column2 = value2,...
     * @param {obj} data - object containing columns and values to be updated
     */
    generateUpdatePairs (data) {
        const values = Object.values(data)
        return Object.keys(data).map((key, index) => {
            return `'${key}' = ${values[index]}`
        })
    }

    // global crud methods

    /**
     * @function - return all rows in the table up to the limit
     * @returns - array of objects
     * @param {number} limit -  The maximium number of items to be queried (defaults to 100)
     */
    async findAll (limit = 100) {
        const result = await this.client.query(`SELECT * FROM ${this.table} LIMIT ${limit}`)
        return result.rows
    }

    /**
     *  @function - find a row in the table by a field and value
     * @returns - object
     * @param {string} id - id you are lookgin for
    */
      async findById (id, limit=50) {
        try{
            const result = await this.client.query(`SELECT * FROM ${this.table} WHERE ${this.primaryKey} = ${id}`)
            return result.rows
        } catch (err) {
            return err
        }
    }

    /**
     *  @function - find a row in the table by a field and value
     * @returns - object
     * @param {string} field  - Name of column to query
     * @param {any} value - value to search for
     * @param {number} limit - Max number of items returned (defaults to 50)
     */
    async find (field, value, limit=50) {
        try{
            const result = await this.client.query(`SELECT * FROM ${this.table} WHERE ${field} = ${value} LIMIT ${limit}`)
            return result.rows
        } catch (err) {
            return err
        }
    }

    /**
     * @function - creates a new row in the primary table
     * @returns - created object
     * @param {obj} data - data to insert into the table
     */
    async create (data) {
        try{
            const columns = this.getColumns(data)
            const values = this.getValues(data)
            const placeholders = this.generatePlaceholders(data)
            const query = {
                text: `INSERT INTO ${this.table} (${columns}) VALUES (${placeholders}) RETURNING *`,
                values: values
            }
            console.log(query)
            const result = await this.client.query(query)
            return result.rows
        } catch(err) {
            console.log( err )
            return err
        }
    }

    /**
     *  @function - updates a row in the table
     * @returns - object
     * @param {string} id  - primary id
     * @param {object} data - data to update with
     */
    async findByIdAndUpdate (id, data) {
        try{
            const query = {
                text: `UPDATE ${this.table} SET ${this.generateUpdatePairs(data)} WHERE ${this.primaryKey} = ${id}`
            }
            console.log(query)
            const result = await this.client.query(query)
            return result.rows
        } catch (err) {
            const error = new Error(err)
            throw error
        }
    }

    /**
     *  @function - deletes a row in the table
     * @returns - deleted object
     * @param {*} field - Name of column to query
     * @param {*} value - value to search for
     */
    async findByIdAndDelete (id) {
        const result = await this.client.query(`DELETE FROM ${this.table} WHERE ${this.primaryKey} = ${id} RETURNING *`)
        return result.rows
    }

}

module.exports = Model