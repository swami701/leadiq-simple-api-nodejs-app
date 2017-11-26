var supertest = require('supertest');
var port = process.env.PORT || 3000
var url = `http://localhost:${port}`;
var api = supertest(url);

describe('Get Transaction By Type', function () {
  it('should return transaction object for given transaction type: cars', function (done) {
    api.get('/transactionservice/types/cars')
      .expect(200)
      .end((err, res) => {
        assert.property(res.body, "result")
        assert.isArray(res.body.result)
        assert.isNumber(res.body.result[0].amount)
        assert.property(res.body.result[0], "id")
        assert.property(res.body.result[0], "type")
        assert.isString(res.body.result[0].type)
        assert.equal(res.body.result[0].type, "cars")
        done()
      })
  });

  it('should return 404 for given transaction type: bike', function (done) {
    api.get('/transactionservice/types/bike')
      .expect(404, done)
  });
});
