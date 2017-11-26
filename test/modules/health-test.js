var supertest = require('supertest');
var port = process.env.PORT || 3000
var url = `http://localhost:${port}`;
var api = supertest(url);

describe('Health Check', function () {
  it('should return a 200 response', function (done) {
    api.get('/health')
      .expect(200, done);
  });
});
