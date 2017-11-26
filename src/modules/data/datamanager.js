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
      subTrans.push(transObj.id);
    }
    transIdToSubTrans[transObj.parent_id] = transObj.id;
  }
}

/**
* This function returns the transaction based on its type
* @param string: Transaction type
* @returns object: Transaction Object
*/
let getTransactionByType = (type) => {
  return transByType[type]
}

module.exports = {
  storeTransaction,
  getTransactionByType
}