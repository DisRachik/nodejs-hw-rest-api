const multer = require('multer');
const path = require('path');

const destination = path.resolve('temp');

const storage = multer.diskStorage({
  destination,
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

module.exports = multer({
  storage,
  limits,
});
