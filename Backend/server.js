import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import articalroute from "./routes/artical.route.js";
import contactusroute from "./routes/contactus.route.js";
import { connectDB } from "./lib/db.js";
import SibApiV3Sdk from "sib-api-v3-sdk";


dotenv.config();

const app = express();
const PORT = process.env.PORT;

const clint = SibApiV3Sdk.ApiClient.instance;

const apiKey = clint.authentications['api-key'];
apiKey.apiKey = process.env.Secret_Mail_Key;



const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/articles", articalroute);
app.use("/api/contactus", contactusroute);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	console.log("Server is running on http://localhost:" + PORT);
	connectDB();
});