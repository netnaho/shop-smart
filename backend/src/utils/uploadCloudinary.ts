import { cloudinary } from "../config/cloudinaryConfig";
import CustomError from "./customError";

export const uploadToCloudinary = async (
  imageUploaded: Buffer
): Promise<{ success: boolean; imageUrl?: string }> => {
  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "smart_shop",
        },
        (error, result) => {
          if (error) {
            return reject(new CustomError("cloudinary upload failed", 500));
          }

          // Result contains the URL and other details of the uploaded image
          resolve({ success: true, imageUrl: result?.secure_url });
        }
      );
      uploadStream.end(imageUploaded);
    });
  } catch (error) {
    throw error;
  }
};
