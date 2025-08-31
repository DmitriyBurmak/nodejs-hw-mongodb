import multer from 'multer';
import path from 'node:path';
import { UPLOAD_DIR } from '../constants/index.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, `${req.user._id}_${Date.now()}${extension}`);
  },
});

export const upload = multer({ storage });
