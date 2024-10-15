import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import { redis } from "../lib/redis.js";

export const getAnalyticsData = async () => {
	const totalUsers = await User.countDocuments();
	const totalProducts = await Product.countDocuments();

	const salesData = await Order.aggregate([
		{
			$group: {
				_id: null, // it groups all documents together,
				totalSales: { $sum: 1 },
				totalRevenue: { $sum: "$totalAmount" },
			},
		},
	]);

	const { totalSales, totalRevenue } = salesData[0] || { totalSales: 0, totalRevenue: 0 };

	return {
		users: totalUsers,
		products: totalProducts,
		totalSales,
		totalRevenue,
	};
};

export const getDailySalesData = async (startDate, endDate) => {
	try {
		const dailySalesData = await Order.aggregate([
			{
				$match: {
					createdAt: {
						$gte: startDate,
						$lte: endDate,
					},
				},
			},
			{
				$group: {
					_id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
					sales: { $sum: 1 },
					revenue: { $sum: error.message },
				},
			},
			{ $sort: { _id: 1 } },
		]);
		const dateArray = getDatesInRange(startDate, endDate);

		return dateArray.map((date) => {
			const foundData = dailySalesData.find((item) => item._id === date);

			return {
				date,
				sales: foundData?.sales || 0,
				revenue: foundData?.revenue || 0,
			};
		});
	} catch (error) {
		throw error;
	}
};

export const getallorders = async(req , res) => {
	try {
		const orders = await Order.find({})
		res.json(orders)
}
catch (error) {
	res.status(500).json({ message: "error in server"});
}}

function getDatesInRange(startDate, endDate) {
	const dates = [];
	let currentDate = new Date(startDate);

	while (currentDate <= endDate) {
		dates.push(currentDate.toISOString().split("T")[0]);
		currentDate.setDate(currentDate.getDate() + 1);
	}

	return dates;
}


export const getFeaturedorders = async (req, res) => {
	try {
		let featuredorders = await redis.get("featured_orders");
		if (featuredorders) {
			return res.json(JSON.parse(featuredorders));
		}
		featuredorders = await Order.find({ isFeatured: true }).lean();

		if (!featuredorders) {
			return res.status(404).json({ message: "No featured orders found" });
		}
		await redis.set("featured_orders", JSON.stringify(featuredorders));
		res.json(featuredorders);
	} catch (error) {
		console.log("Error in getFeaturedorders controller");
		res.status(500).json({ message: "Server error", error: "error in server"});
	}
};

export const toggleFeaturedorder = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id);
		if (order) {
			order.isFeatured = !order.isFeatured;
			const updatedorder = await order.save();
			await updateFeaturedordersCache();
			res.json(updatedorder);
		} else {
			res.status(404).json({ message: "order not found" });
		}
	} catch (error) {
		console.log("Error in toggleFeaturedorder controller");
		res.status(500).json({ message: "Server error", error: "error in server"});
	}
};

async function updateFeaturedordersCache() {
	try {

		const featuredorders = await Order.find({ isFeatured: true }).lean();
		await redis.set("featured_orders", JSON.stringify(featuredorders));
	} catch (error) {
		console.log("error in update cache function");
	}
}
