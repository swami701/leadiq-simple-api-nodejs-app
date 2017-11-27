var storageService = require('../modules/data/datamanager')

/**
 * This function check for business logic and saves transaction
 * @param {object} transObj Transaction object
 * @returns {void}
 */
let createTransaction = (transObj) => {
  // Add business logic here
  storageService.storeTransaction(transObj)
}

/**
* This function returns the transaction based on its type
* @param {string} type Transaction type
* @returns {object} Transaction Object
*/
let getTransactionByType = (type) => {
  return storageService.getTransactionByType(type)
}

/**
* This function returns the transaction sum for given id 
* and its sub transaction ids
* @param {number} id Transaction id
* @returns {number} Transaction Sum
*/
let getTransactionSum = (id) => {
  return storageService.getTransactionSum(id)
}

module.exports = {
  createTransaction,
  getTransactionByType,
  getTransactionSum
}