let transById = {}
let transByType = {}
let transIdToSubTrans = {}

/**
 * This function stores the transaction in memory
 * @param object: Trans obj
 * @returns void
 */
let storeTransaction = (transObj) = {
  transById[transObj.id] = transObj
  
  let transObjs = [];
  if (transByType[transObj.type]) {
    transObjs = transByType[transObj.type]
  }
  transObjs.push(transObj);
  transByType[transObj.type] = transObjs;
  
  if (transObj.parent_id) {
    let subTrans = [];
    if (transIdToSubTrans[transObj.parent_id]) {
      subTrans = transIdToSubTrans[transObj.parent_id];
    }
    subTrans.push(transObj.id);
    transIdToSubTrans[transObj.parent_id] = transObj.id;
  }
}

module.exports = {
  storeTransaction
}