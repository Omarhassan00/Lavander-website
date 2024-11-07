import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";
import SibApiV3Sdk from "sib-api-v3-sdk";

export const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({}); // find all products
		res.json({ products });
	} catch (error) {
		console.log("Error in getAllProducts controller");
		res.status(500).json({ message: "Server error"});
	}
};

export const getFeaturedProducts = async (req, res) => {
	try {
		let featuredProducts = await redis.get("featured_products");
		if (featuredProducts) {
			return res.json(JSON.parse(featuredProducts));
		}
		featuredProducts = await Product.find({ isFeatured: true }).lean();

		if (!featuredProducts) {
			return res.status(404).json({ message: "No featured products found" });
		}

		await redis.set("featured_products", JSON.stringify(featuredProducts));

		res.json(featuredProducts);
	} catch (error) {
		console.log("Error in getFeaturedProducts controller");
		res.status(500).json({ message: "Server error"});
	}
};

export const createProduct = async (req, res) => {
	try {
		const { name, code, description, details, price, gender, color, category } = req.body;
		const images = req.body.image; // assuming images are sent in an array
		const main_image = req.body.main_image;
		let cloudinaryResponses = [];

		if (images) {
			for (let image of images) {
				const cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
				cloudinaryResponses.push(cloudinaryResponse.secure_url);
			}
		}

		const cloudinarymainemage = await cloudinary.uploader.upload(main_image, { folder: "products" });

		const product = await Product.create({
			name,
			description,
			code,
			price,
			details,
			image: cloudinaryResponses,
			main_image: cloudinarymainemage.secure_url,
			category,
			gender,
			color,
		});

		res.status(200).json(product);
	} catch (error) {
		console.log("Error in createProduct controller");
		res.status(500).json({ message: "Server error" });
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
					console.log("error deleting image from cloduinary");
				}
			}
		}

		if (product.main_image) {
			const publicmainId = product.main_image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`products/${publicmainId}`);
				console.log("deleted main image from cloduinary");
			} catch (error) {
				console.log("error deleting main image from cloduinary", error);
			}
		}

		await Product.findByIdAndDelete(req.params.id);
		await updateFeaturedProductsCache();

		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.log("Error in deleteProduct controller");
		res.status(500).json({ message: "Server error"});
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
		console.log("Error in getRecommendedProducts controller");
		res.status(500).json({ message: "Server error"});
	}
};

export const getProductsByCategory = async (req, res) => {
	const { category } = req.params;
	try {
		const products = await Product.find({ category });
		res.json({ products });
	} catch (error) {
		console.log("Error in getProductsByCategory controller");
		res.status(500).json({ message: "Server error"});
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
		console.log("Error in getProductsBygender controller");
		res.status(500).json({ message: "Server error"});
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
		console.log("Error in get gender controller");
		res.status(500).json({ message: "Server error"});
	}
};


export const getProductsByID = async (req, res) => {
	const id = req.params;
	try {
		const products = await Product.findOne(id);
		res.json(products);
	} catch (error) {
		console.log("Error in getProductsByid controller");
		res.status(500).json({ message: "Server error"});
	}
};

export const toggleFeaturedProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (product) {
			product.isFeatured = !product.isFeatured;
			const updatedProduct = await product.save();
	//		await updateFeaturedProductsCache();
			res.json(updatedProduct);
		} else {
			res.status(404).json({ message: "Product not found" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error"});
	}
};

async function updateFeaturedProductsCache() {
	try {
		// The lean() method  is used to return plain JavaScript objects instead of full Mongoose documents. This can significantly improve performance

		const featuredProducts = await Product.find({ isFeatured: true }).lean();
		await redis.set("featured_products", JSON.stringify(featuredProducts));
	} catch (error) {
		console.log(error);
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

		const images = req.body.image;
		if (images != "") {
			for (let oldimage of theproduct.image) {
				const publicId = oldimage.split("/").pop().split(".")[0];
				try {
					await cloudinary.uploader.destroy(`products/${publicId}`);
					console.log("deleted image from cloduinary");
				} catch (error) {
					console.log("error deleting image from cloduinary", error);
				}
			}
			let cloudinaryResponses = [];

			for (let image of images) {
				const cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
				cloudinaryResponses.push(cloudinaryResponse.secure_url);
			}

			theproduct.image = cloudinaryResponses;
		}
		if (req.body.main_image != "") {

			const publicmainId = theproduct.main_image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`products/${publicmainId}`);
				console.log("deleted main image from cloduinary");
			} catch (error) {
				console.log("error deleting main image from cloduinary", error);
			}

			const cloudinarymainemage = await cloudinary.uploader.upload(req.body.main_image, { folder: "products" });
			if (theproduct.main_image) {
				theproduct.main_image = cloudinarymainemage.secure_url;
			}
			else {
				await Product.updateOne({_id: theproduct._id},{ $push: { main_image: cloudinarymainemage.secure_url } });
			}
		}

		theproduct.name = data.name;
		theproduct.description = data.description;
		theproduct.code = data.code;
		theproduct.price = data.price;
		theproduct.details = data.details;
		theproduct.category = data.category;
		theproduct.gender = data.gender;
		theproduct.color = data.color

		const product = await theproduct.save();

		await updateFeaturedProductsCache();

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
