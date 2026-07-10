import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../lib/s3.js";
import { ENV } from "../lib/env.js";
import { v4 as uuidv4 } from "uuid";
import User from "../models/User.js";
export const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        const key = `resumes/${uuidv4()}-${req.file.originalname}`;

        await s3.send(
            new PutObjectCommand({
                Bucket: ENV.AWS_BUCKET_NAME,
                Key: key,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
            })
        );

        const fileUrl = `https://${ENV.AWS_BUCKET_NAME}.s3.${ENV.AWS_REGION}.amazonaws.com/${key}`;

        

        return res.status(200).json({
            success: true,
            profileImage: fileUrl,
        });

    } catch (error) {
    console.error("S3 Upload Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
            error,
        });
    }
};