import express from "express";
import { contactus } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", contactus);

export default router;
