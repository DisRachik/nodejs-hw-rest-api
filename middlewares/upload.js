const multer = require('multer');
const path = require('path');

const destination = path.resolve('temp');

const storage = multer.diskStorage({
  destination,
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

module.exports = multer({
  storage,
  limits,
});
