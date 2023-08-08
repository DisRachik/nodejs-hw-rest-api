const fs = require('fs/promises');
const Jimp = require('jimp');

const { HttpError } = require('../helpers');

const optimizeImg = async (req, _, next) => {
  if (!req.file) {
    return next(HttpError(400, 'No image submitted.'));
  }

  const { path } = req.file;

  try {
    const uploadedFile = await Jimp.read(path);
    uploadedFile.cover(250, 250).write(path);
  } catch (error) {
    await fs.unlink(path);
    return next(HttpError(400, 'Bad image.'));
  }

  next();
};

module.exports = optimizeImg;
