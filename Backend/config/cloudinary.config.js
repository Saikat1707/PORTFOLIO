const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');
const path = require('path');

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a file to Cloudinary from the local file system.
 * Deletes the local file after successful upload.
 *
 * @param {string} localFilePath - Absolute or relative path to the file on disk
 * @returns {Promise<Object>} Cloudinary upload result or throws error
 */
const uploadFile = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new Error('No file path provided');
    }

    if (!fs.existsSync(localFilePath)) {
      throw new Error(`File not found at path: ${localFilePath}`);
    }

    const uploadedFile = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });

    console.log('✅ File uploaded to Cloudinary:', uploadedFile.secure_url);

    // Clean up local file after successful upload
    fs.unlinkSync(localFilePath);

    return uploadedFile;
  } catch (error) {
    console.error('❌ Upload to Cloudinary failed:', error.message);

    // Clean up if error occurred and file still exists
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    throw error; // Let the caller handle the error
  }
};

module.exports = { uploadFile };
