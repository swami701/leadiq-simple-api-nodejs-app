var supertest = require('supertest');
var port = process.env.PORT || 3000
var url = `http://localhost:${port}`;
var api = supertest(url);

describe('Get Transaction By Type', function () {
  it('should create transaction for grocery', function (done) {
    api.put('/transactionservice/transaction/100')
      .set('Accept', 'application/json')
      .send(
      {
        "type": "grocery",
        "amount": 55
      }).expect(200, done)
  });

  it('should create transaction for milk', function (done) {
    api.put('/transactionservice/transaction/101')
      .set('Accept', 'application/json')
      .send(
      {
        "type": "milk",
        "amount": 60,
        "parent_id": 100
      }).expect(200, done)
  });

  let gsum = 0;
  it('should return transaction sum for given transaction id: 100', function (done) {
    api.get('/transactionservice/sum/100')
      .expect(200)
      .end((err, res) => {
        assert.property(res.body, "result")
        assert.property(res.body.result, "sum")
        assert.isNumber(res.body.result.sum)
        gsum = res.body.result.sum
        done()
      })
  });

  it('should return transaction sum for given transaction id: 101', function (done) {
    api.get('/transactionservice/sum/101')
      .expect(200)
      .end((err, res) => {
        assert.property(res.body, "result")
        assert.property(res.body.result, "sum")
        assert.isNumber(res.body.result.sum)
        assert.isBelow(res.body.result.sum, gsum)
        done()
      })
  });
});
