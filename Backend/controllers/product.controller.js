import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";
import SibApiV3Sdk from "sib-api-v3-sdk";

export const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({}); // find all products
		res.json({ products });
	} catch (error) {
		console.log("Error in getAllProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getFeaturedProducts = async (req, res) => {
	try {
		let featuredProducts = await redis.get("featured_products");
		if (featuredProducts) {
			return res.json(JSON.parse(featuredProducts));
		}

		// if not in redis, fetch from mongodb
		// .lean() is gonna return a plain javascript object instead of a mongodb document
		// which is good for performance
		featuredProducts = await Product.find({ isFeatured: true }).lean();

		if (!featuredProducts) {
			return res.status(404).json({ message: "No featured products found" });
		}

		// store in redis for future quick access

		await redis.set("featured_products", JSON.stringify(featuredProducts));

		res.json(featuredProducts);
	} catch (error) {
		console.log("Error in getFeaturedProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const createProduct = async (req, res) => {
	try {
		const { name, code, description, details, price, gender, color, category } = req.body;
		const images = req.body.image; // assuming images are sent in an array

		let cloudinaryResponses = [];

		if (images) {
			for (let image of images) {
				const cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
				cloudinaryResponses.push(cloudinaryResponse.secure_url);
			}
		}

		const product = await Product.create({
			name,
			description,
			code,
			price,
			details,
			image: cloudinaryResponses,
			category,
			gender, color
		});

		res.status(201).json(product);
	} catch (error) {
		console.log("Error in createProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		if (product.image) {
			for (let image of product.image) {
				const publicId = image.split("/").pop().split(".")[0];
				try {
					await cloudinary.uploader.destroy(`products/${publicId}`);
					console.log("deleted image from cloduinary");
				} catch (error) {
					console.log("error deleting image from cloduinary", error);
				}
			}
		}
		// if (product.image) {
		// 	const publicId = product.image.split("/").pop().split(".")[0];
		// 	try {
		// 		await cloudinary.uploader.destroy(`products/${publicId}`);
		// 		console.log("deleted image from cloduinary");
		// 	} catch (error) {
		// 		console.log("error deleting image from cloduinary", error);
		// 	}
		// }

		await Product.findByIdAndDelete(req.params.id);
		await updateFeaturedProductsCache();

		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.log("Error in deleteProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getRecommendedProducts = async (req, res) => {
	try {
		const products = await Product.aggregate([
			{
				$sample: { size: 4 },
			},
			{
				$project: {
					_id: 1,
					name: 1,
					description: 1,
					image: 1,
					price: 1,
				},
			},
		]);

		res.json(products);
	} catch (error) {
		console.log("Error in getRecommendedProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getProductsByCategory = async (req, res) => {
	const { category } = req.params;
	try {
		const products = await Product.find({ category });
		res.json({ products });
	} catch (error) {
		console.log("Error in getProductsByCategory controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getgenderlavand = async (req, res) => {
	const { gender } = req.params;
	try {
		const products = await Product.find({
			gender: gender,
			category: "Lavand"
		});
		res.json({ products });
	} catch (error) {
		console.log("Error in getProductsBygender controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getgenderlavant = async (req, res) => {
	const { gender } = req.params;
	try {
		const products = await Product.find({
			gender: gender,
			category: "Lavant"
		});
		res.json({ products });
	} catch (error) {
		console.log("Error in get gender controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};


export const getProductsByID = async (req, res) => {
	const id = req.params;
	try {
		const products = await Product.findOne(id);
		res.json(products);
	} catch (error) {
		console.log("Error in getProductsByid controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const toggleFeaturedProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (product) {
			product.isFeatured = !product.isFeatured;
			const updatedProduct = await product.save();
			await updateFeaturedProductsCache();
			res.json(updatedProduct);
		} else {
			res.status(404).json({ message: "Product not found" });
		}
	} catch (error) {
		console.log("Error in toggleFeaturedProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

async function updateFeaturedProductsCache() {
	try {
		// The lean() method  is used to return plain JavaScript objects instead of full Mongoose documents. This can significantly improve performance

		const featuredProducts = await Product.find({ isFeatured: true }).lean();
		await redis.set("featured_products", JSON.stringify(featuredProducts));
	} catch (error) {
		console.log("error in update cache function");
	}
}

export const updateProduct = async (req, res) => {
	try {
		const data = req.body;

		const theproduct = await Product.findById(req.body.id);

		if (!theproduct) {
			return (
				res.status(400).json({ message: "no product found" }));
		}

		const theid = theproduct._id
		const product = await Product.findByIdAndUpdate(
			theid,
			data,
			{ new: true }
		);

		res.status(200).json(product);
	} catch (error) {
		console.log("Error in updateProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const contactus = async (req, res) => {
	const { fullname, email, message } = req.body;
	try {

		const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

		await tranEmailApi.sendTransacEmail({
			sender: { "name": "Lavander Website", "email": "omarhassan00123@gmail.com" },
			to: [{ "name": `loay ashraf`, "email": `loayoffice80@gmail.com` }],
			subject: "Massage from contact",
			htmlContent: ` <h2>Massage from ${email}</h2>
			<p>${fullname} say,</p>
			</br>
			<p>${message}</p>`
		})

		res.status(200).json({ message: "message sent" })
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error" });
	}
}