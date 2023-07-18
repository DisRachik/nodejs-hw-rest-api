const HttpError = (status, message) => {
  const err = new Error(message);
  err.status = status;
  console.log(err.status);
  return err;
};

module.exports = HttpError;
