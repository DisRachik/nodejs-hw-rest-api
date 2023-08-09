const fs = require('fs/promises');
const Jimp = require('jimp');
const HttpError = require('./HttpError');

const optimizeImg = async (file) => {
  try {
    const image = await Jimp.read(file);
    image.resize(250, 250);
    await image.writeAsync(file);
  } catch (error) {
    await fs.unlink(file);
    throw HttpError(400, 'The image must be in the following format: jpeg, png, bmp, tiff, gif!');
  }
};

module.exports = optimizeImg;
