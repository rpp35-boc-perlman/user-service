// standardize api reposonses

/**
 * @function
 * @param {number} status - status code to return
 * @param {string} message - message to return to client (if any)
 * @param {array} data - data to be returned
 * @param {object} error - error (if any occured)
 */
function response (status = 200, message = "No message specified", data = [], error = null ) {
        let obj = {
            status,
            message,
            data
        }
        if (error) {
            obj.error = error
        }
        return obj
}

module.exports = response