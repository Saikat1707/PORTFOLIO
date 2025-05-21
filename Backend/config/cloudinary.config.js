// utils/cloudinaryUploader.js
const { v2: cloudinary } = require('cloudinary');
const streamifier = require('streamifier'); // required for buffer upload

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload file buffer to Cloudinary using stream
 * @param {Buffer} buffer - File buffer
 * @returns {Promise<Object>} Cloudinary response
 */
const uploadFileFromBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

module.exports = { uploadFileFromBuffer };
