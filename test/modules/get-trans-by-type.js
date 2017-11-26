var supertest = require('supertest');
var port = process.env.PORT || 3000
var url = `http://localhost:${port}`;
var api = supertest(url);

describe('Get Transaction By Type', function () {
  it('should create transaction for bus', function (done) {
    api.put('/transactionservice/transaction/50')
    .set('Accept', 'application/json')
    .send(
    {
      "type": "bus",
      "amount": 100
    }).expect(200, done)
  });

  it('should return transaction object for given transaction type: bus', function (done) {
    api.get('/transactionservice/types/bus')
      .expect(200)
      .end((err, res) => {
        assert.property(res.body, "result")
        assert.isArray(res.body.result)
        assert.isNumber(res.body.result[0].amount)
        assert.property(res.body.result[0], "id")
        assert.property(res.body.result[0], "type")
        assert.isString(res.body.result[0].type)
        assert.equal(res.body.result[0].type, "bus")
        done()
      })
  });

  it('should return 404 for given transaction type: bike', function (done) {
    api.get('/transactionservice/types/bike')
      .expect(404, done)
  });
});
