var create = (req, res) => {
  let transObj = {}
  transObj.id = req.params.id
  transObj.amount = req.params.amount
  transObj.type = req.params.type
  if (req.params.parent_id) {
    transObj.parent_id = req.params.parent_id
  }
  res.send(200, "Success")
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
