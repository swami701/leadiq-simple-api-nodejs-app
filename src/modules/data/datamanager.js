/* eslint max-statements: ["error", 19] */

let transById = {}
let transByType = {}
let transIdToSubTrans = {}

/**
 * This function stores the transaction in memory
 * @param {object} transObj Trans obj
 * @returns {void}
 */
let storeTransaction = (transObj) => {
  transById[transObj.id] = transObj

  let transObjs = [];
  if (transByType[transObj.type]) {
    transObjs = transByType[transObj.type]
  }
  let isExist1 = transObjs.some(item => item.id === transObj.id);
  if (!isExist1) {
    transObjs.push(transObj);
  }
  transByType[transObj.type] = transObjs;

  if (transObj.parent_id) {
    let subTrans = [];
    if (transIdToSubTrans[transObj.parent_id]) {
      subTrans = transIdToSubTrans[transObj.parent_id];
    }
    let isExist2 = subTrans.some(item => item === transObj.id);
    if (!isExist2) {
      subTrans.push(transObj.id)
    }
    transIdToSubTrans[transObj.parent_id] = subTrans
  }
}

/**
* This function returns the transaction based on its type
* @param {string} type Transaction type
* @returns {object} Transaction Object
*/
let getTransactionByType = (type) => {
  let ids = []
  if (transByType[type]) {
    for (let iVar = 0; iVar < transByType[type].length; iVar++) {
      let transObj = transByType[type][iVar];
      ids.push(transObj.id)
    }
    return ids
  } else {
    return undefined
  }
}

/**
* This function returns the transaction sum for given id and 
* its sub transaction ids
* @param {number} id Transaction id
* @returns {number} Transaction Sum
*/
let getTransactionSum = (id) => {
  let sum = 0;
  if (transIdToSubTrans[id]) {
    for (let iVar = 0; iVar < transIdToSubTrans[id].length; iVar++) {
      let transId = transIdToSubTrans[id][iVar]
      sum += transById[transId].amount
    }
  }

  if (transById[id]) {
    sum += transById[id].amount
    return sum
  } else {
    return undefined
  }
}

module.exports = {
  storeTransaction,
  getTransactionByType,
  getTransactionSum
}