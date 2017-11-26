var errorHandler = {
  validationError: (res, errors) => {
    res.send(406, errors)
  }
};

module.exports = errorHandler;
