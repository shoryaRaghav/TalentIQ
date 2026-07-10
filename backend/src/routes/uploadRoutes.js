import express from "express";
import { uploadResume } from "../controllers/uploadController.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
    "/profile",
    upload.single("file"),
    uploadResume
);

export default router;