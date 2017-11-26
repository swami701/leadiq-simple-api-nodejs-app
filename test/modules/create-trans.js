var supertest = require('supertest');
var port = process.env.PORT || 3000
var url = `http://localhost:${port}`;
var api = supertest(url);

describe('Create Transaction', function () {
  it('should return a 200 response for successful transaction creation', function (done) {
    api.put('/transactionservice/transaction/10')
      .set('Accept', 'application/json')
      .send(
      {
        "type": "car",
        "amount": 100
      })
      .expect(200, done);
  });
});
