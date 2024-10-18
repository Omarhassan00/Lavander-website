import express from "express";
import {
	createarticle,
	deletearticle,
	getAllarticles,
	getFeaturedarticles,
	getarticlesByID,
	getRecommendedarticles,
	toggleFeaturedarticle,
	updatearticle,
} from "../controllers/article.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAllarticles);
router.get("/featured", getFeaturedarticles);
router.get("/get/:id", getarticlesByID);
router.get("/recommendations", getRecommendedarticles);
router.post("/", protectRoute, adminRoute, createarticle);
router.put("/", protectRoute, adminRoute, updatearticle);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedarticle);
router.delete("/:id", protectRoute, adminRoute, deletearticle);

export default router;
