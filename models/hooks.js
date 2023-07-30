const handleSaveError = (error, _, next) => {
  const { code, name } = error;
  if (code === 11000 && name === 'MongoServerError') {
    error.status = 409;
    error.message = 'Email in use.';
    return next();
  }

  error.status = 400;
  next();
};

const handleUpdateValidate = (next) => {
  this.options.runValidate = true;
  next();
};

module.exports = { handleSaveError, handleUpdateValidate };
