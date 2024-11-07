import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
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
const allowedOrigins = [
    'https://www.lavanderleatherproducts.net',
    'https://lavanderleatherproducts.net'
];

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "20mb" })); // allows you to parse the body of the request
app.use(express.urlencoded({ limit: "20mb", extended: true}));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/articles", articalroute);
app.use("/api/contactus", contactusroute);

app.listen(PORT, () => {
	console.log("Server is running");
	connectDB();
});
