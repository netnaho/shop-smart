import multer from "multer";

// set up multer to store files in memory as buffers
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 }, // limits the file size to 15MB
});

export { upload };
