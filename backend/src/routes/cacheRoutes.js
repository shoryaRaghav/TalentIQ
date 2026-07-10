import express from "express";
import { cacheTest } from "../controllers/cacheController.js";

const router = express.Router();

router.get("/", cacheTest);

export default router;