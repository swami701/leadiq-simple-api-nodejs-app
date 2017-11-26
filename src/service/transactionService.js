var storageService = require('../modules/data/datamanager')

/**
 * This function check for business logic and saves transaction
 * @param object: Trans obj
 * @returns void
 */
let createTransaction = (transObj) => {
  // Add business logic here
  storageService.storeTransaction(transObj)
}

/**
* This function returns the transaction based on its type
* @param string: Transaction type
* @returns object: Transaction Object
*/
let getTransactionByType = (type) => {
  return storageService.getTransactionByType(type)
}

module.exports = {
  createTransaction,
  getTransactionByType
}