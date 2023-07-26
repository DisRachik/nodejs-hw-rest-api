const handleSaveError = (error, _, next) => {
  error.status = 400;
  next();
};

const handleUpdateValidate = (next) => {
  this.options.runValidate = true;
  next();
};

module.exports = { handleSaveError, handleUpdateValidate };
