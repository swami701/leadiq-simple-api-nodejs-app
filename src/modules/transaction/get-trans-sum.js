var transactionService = require('../../service/transactionService')

var get = (req, res) => {
  let sum = transactionService.getTransactionSum(req.params.id)
  if (sum) {
    res.send(200, { sum: sum })
  } else {
    res.send(404, `Transaction not found for the id: ${req.params.id}!`)
  }
};

let getTransSum = {
  getTransSum: get,
  validation: {
    resources: {
      id: {
        isRequired: true,
        isNumeric: true
      }
    }
  }
}

module.exports = getTransSum
