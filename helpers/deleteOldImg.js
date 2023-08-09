const path = require('path');
const fs = require('fs/promises');

const deleteOldImg = async (imageUrl) => {
  const imagePath = path.resolve(imageUrl);

  try {
    await fs.access(imagePath, fs.constants.F_OK);
    await fs.unlink(imagePath);
  } catch (err) {
    console.info('Info: not deleted the previous image');
  }
};

module.exports = deleteOldImg;
