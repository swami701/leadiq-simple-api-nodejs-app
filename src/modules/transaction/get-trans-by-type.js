var transactionService = require('../../service/transactionService')

var get = (req, res) => {
  let transObj = transactionService.getTransactionByType(req.params.type)
  if (transObj) {
    res.send(200, transObj)
  } else {
    res.send(404, `Transaction not found for the type: ${req.params.type}!`)
  }
};

let getTrans = {
  getTrans: get,
  validation: {
    resources: {
      type: {
        isRequired: true,
        isAlpha: true
      }
    }
  }
}

module.exports = getTrans
