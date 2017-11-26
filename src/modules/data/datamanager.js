let transById = {}
let transByType = {}
let transIdToSubTrans = {}

/**
 * This function stores the transaction in memory
 * @param object: Trans obj
 * @returns void
 */
let storeTransaction = (transObj) => {
  transById[transObj.id] = transObj

  let transObjs = [];
  if (transByType[transObj.type]) {
    transObjs = transByType[transObj.type]
  }
  let isExist = transObjs.some(item => item.id === transObj.id);
  if (!isExist) {
    transObjs.push(transObj);
  }
  transByType[transObj.type] = transObjs;

  if (transObj.parent_id) {
    let subTrans = [];
    if (transIdToSubTrans[transObj.parent_id]) {
      subTrans = transIdToSubTrans[transObj.parent_id];
    }
    let isExist = subTrans.some(item => item === transObj.id);
    if (!isExist) {
      subTrans.push(transObj.id)
    }
    transIdToSubTrans[transObj.parent_id] = subTrans
  }
}

/**
* This function returns the transaction based on its type
* @param string: Transaction type
* @returns object: Transaction Object
*/
let getTransactionByType = (type) => {
  let ids = []
  if (transByType[type]) {
    for (var i = 0; i < transByType[type].length; i++) {
      let transObj = transByType[type][i];
      ids.push(transObj.id)
    }
    return ids
  } else {
    return undefined
  }
}

/**
* This function returns the transaction sum for given id and its sub transaction ids
* @param number: Transaction id
* @returns number: Transaction Sum
*/
let getTransactionSum = (id) => {
  let sum = 0;
  if (transIdToSubTrans[id]) {
    for (var i = 0; i < transIdToSubTrans[id].length; i++) {
      let transId = transIdToSubTrans[id][i]
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