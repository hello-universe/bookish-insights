var cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });
    return result;
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    fs.unlinkSync(localFilePath); //remove the locally saved temporary file
  }
};

module.exports = uploadOnCloudinary;
