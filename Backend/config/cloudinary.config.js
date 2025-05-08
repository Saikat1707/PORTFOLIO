const { v2:cloudinary} = require('cloudinary');
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadFile = async (localStoragePath) =>{
    try {
        if(!localStoragePath) return null;
        const uploadedFile = await cloudinary.uploader.upload(localStoragePath , {
            resource_type: 'auto',
        })
        console.log('file uploaded to cloudinary')
        return uploadedFile;
    } catch (error) {
        if (fs.existsSync(localStoragePath)) {
            fs.unlinkSync(localStoragePath);
        }
      
        return error;
    }

}


module.exports = {uploadFile}