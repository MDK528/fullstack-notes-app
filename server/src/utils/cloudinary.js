import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

import { configDotenv } from "dotenv";
configDotenv();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("API Key:", process.env.CLOUDINARY_API_KEY);
// console.log("API Secret:", process.env.CLOUDINARY_API_SECRET);


const uploadOnCloudinary = async (localPath) =>
{
    try
    {
        if (!localPath) return null
        const uploadedFile = await cloudinary.uploader.upload(localPath, {
            resource_type: "image",
            // overwrite: true
        })

        fs.unlinkSync(localPath)
        return uploadedFile
    } catch (error)
    {
        fs.unlinkSync(localPath)
        console.log(error)
        // throw error;
    }
}

export { uploadOnCloudinary }