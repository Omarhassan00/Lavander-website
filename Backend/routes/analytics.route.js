import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { getallorders, getAnalyticsData, getDailySalesData, getFeaturedorders, toggleFeaturedorder } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, async (req, res) => {
	try {
		const analyticsData = await getAnalyticsData();

		const endDate = new Date();
		const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

		const dailySalesData = await getDailySalesData(startDate, endDate);

		res.json({
			analyticsData,
			dailySalesData,
		});
	} catch (error) {
		console.log("Error in analytics route", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
});

router.get("/orders", protectRoute, adminRoute, getallorders)
router.get("/featured", getFeaturedorders);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedorder);

export default router;