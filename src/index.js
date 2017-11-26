var restify = require('restify');
var restifyValidation = require('node-restify-validation');
var errorHandler = require('./modules/handler/error');
var responseHandler = require('./modules/handler/responseHandler');
var server = restify.createServer({
  formatters: {
    "application/json": responseHandler
  }
});

// Health
var health = require('./modules/health/health');
var createTrans = require('./modules/transaction/create-trans')
var getTransByType = require('./modules/transaction/get-trans-by-type')
var getTransSum = require('./modules/transaction/get-trans-sum')

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser({
  mapParams: true
}));
server.use(restify.plugins.bodyParser({
  mapParams: true
}));

server.use((req, res, next) => {
  console.log(new Date(), req.method, req.url);
  next();
});
// errorsAsArray: Shows errors as an array
// forbidUndefinedVariables: Not exclude incoming variables not specified in
//  validator rules
server.use(restifyValidation.validationPlugin({
  errorsAsArray: false,
  forbidUndefinedVariables: false,
  handleError: errorHandler.validationError
}));

// Endpoints
server.get('/health', health)

server.put({
  path: '/transactionservice/transaction/:id',
  validation: createTrans.validation
}, createTrans.createTrans)

server.get({
  path: '/transactionservice/types/:type',
  validation: getTransByType.validation
}, getTransByType.getTrans)

server.get({
  path: '/transactionservice/sum/:id',
  validation: getTransSum.validation
}, getTransSum.getTransSum)

var port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('%s listening at %s', server.name, server.url);
});

server.on('uncaughtException', (req, res, route, error) => {
  console.error(`${(new Date()).toUTCString()} ` +
    `uncaughtException: ${error.message}`)
  responseHandler.sendResponse(res, 500, "Internal server error",
    error.message);
});
