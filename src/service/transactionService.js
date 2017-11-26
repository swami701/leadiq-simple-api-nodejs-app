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

module.exports = {
  createTransaction
}