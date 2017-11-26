var transactionService = require('../../service/transactionService')

var create = (req, res) => {
  let transObj = {}
  transObj.id = req.params.id
  transObj.amount = req.params.amount
  transObj.type = req.params.type
  if (req.params.parent_id) {
    transObj.parent_id = req.params.parent_id
  }
  transactionService.createTransaction(transObj)
  res.send(200, "ok")
};

let createTrans = {
  createTrans: create,
  validation: {
    resources: {
      id: {
        isRequired: true,
        isNumeric: true
      },
      amount: {
        isRequired: true,
        isNumeric: true
      },
      type: {
        isRequired: true,
        isAlpha: true
      }
    }
  }
}

module.exports = createTrans
