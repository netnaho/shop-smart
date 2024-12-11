import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from 'multer-storage-cloudinary';

const CLOUD_NAME = String(process.env.CLOUDINARY_CLOUD_NAME);
const API_KEY = String(process.env.CLOUDINARY_API_KEY);
const API_SECRET = String(process.env.CLOUDINARY_API_SECRET);

// Configure cloudinary with your credentials
try {
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
  });
} catch (error: any) {
  console.log(error.message);
}

// Configure multer-storage-cloudinary to use Cloudinary as storage
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'your-folder-name', // Folder where your images will be stored
//     allowed_formats: ['jpg', 'png'], // Allowed image formats
//   },
// });

export { cloudinary };
