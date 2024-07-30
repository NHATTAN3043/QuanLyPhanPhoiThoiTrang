const cloudinary = require('../../config/cloudinary')
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')

//  Cấu hình Multer Storage cho Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'Avatar',
    allowedFormats: ['jsp', 'png', 'jpeg'],
    transformation: [{ width: 500, height: 500, crop: 'limit'}],
})

const upload = multer({ storage: storage }).single('HinhAnh')

// Middleware để upload
const uploadMiddleware = (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).send({ message: err.message });
      }
      if (req.file) {
        req.cloudinaryFile = req.file;
      }
      next();
    });
  };
  
  module.exports = {
    upload: uploadMiddleware,
  };