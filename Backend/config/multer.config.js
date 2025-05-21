const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads'); 
  },
  filename: function (req, file, cb) {
    const safeName = file.originalname.replace(/[^\w.-]/g, '_');
    cb(null, `${Date.now()}-${safeName}`);
  }
});

const upload = multer({ storage });
module.exports = { upload };
