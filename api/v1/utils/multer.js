const multer = require('multer');
const path = require('path');

// Configure where to store the uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Path where images will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// Filter to only accept image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG and JPG images are allowed!'), false);
  }
};

// Configure multer instance
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB size limit
  fileFilter
});

module.exports = upload;
