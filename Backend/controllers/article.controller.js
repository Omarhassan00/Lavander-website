import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import article from "../models/article.model.js";

export const getAllarticles = async (req, res) => {
	try {
		const articles = await article.find({}); // find all articles
		res.json({ articles });
	} catch (error) {
		console.log("Error in getAllarticles controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getFeaturedarticles = async (req, res) => {
	try {
		let featuredarticles = await redis.get("featured_articles");
		if (featuredarticles) {
			return res.json(JSON.parse(featuredarticles));
		}

		// if not in redis, fetch from mongodb
		// .lean() is gonna return a plain javascript object instead of a mongodb document
		// which is good for performance
		featuredarticles = await article.find({ isFeatured: true }).lean();

		if (!featuredarticles) {
			return res.status(404).json({ message: "No featured articles found" });
		}

		// store in redis for future quick access

		await redis.set("featured_articles", JSON.stringify(featuredarticles));

		res.json(featuredarticles);
	} catch (error) {
		console.log("Error in getFeaturedarticles controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const createarticle = async (req, res) => {
	try {
		const { title, description, image, facebook, instagram, tiktok, website } = req.body;

		let cloudinaryResponse = null;

		if (image) {
			cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "articles" });
		}

		const newarticle = await article.create({
			title,
			description,
			image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
			facebook, instagram, tiktok, website
		});

		res.status(201).json(newarticle);
	} catch (error) {
		console.log("Error in createarticle controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const deletearticle = async (req, res) => {
	try {
		const delarticle = await article.findById(req.params.id);

		if (!delarticle) {
			return res.status(404).json({ message: "article not found" });
		}

		if (delarticle.image) {
			const publicId = delarticle.image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`articles/${publicId}`);
				console.log("deleted image from cloduinary");
			} catch (error) {
				console.log("error deleting image from cloduinary", error);
			}
		}

		await article.findByIdAndDelete(req.params.id);
		await updateFeaturedarticlesCache();

		res.json({ message: "article deleted successfully" });
	} catch (error) {
		console.log("Error in deletearticle controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getRecommendedarticles = async (req, res) => {
	try {
		const articles = await article.aggregate([
			{
				$sample: { size: 4 },
			},
			{
				$project: {
					_id: 1,
					title: 1,
					description: 1,
					image: 1,
				},
			},
		]);

		res.json(articles);
	} catch (error) {
		console.log("Error in getRecommendedarticles controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};


export const getarticlesByID = async (req, res) => {
	const { id } = req.params;
	try {
		const articles = await article.findOne(id);
		res.json({ articles });
	} catch (error) {
		console.log("Error in getarticlesByid controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const toggleFeaturedarticle = async (req, res) => {
	try {
		const idarticle = await article.findById(req.params.id);
		if (idarticle) {
			idarticle.isFeatured = !idarticle.isFeatured;
			const updatedarticle = await idarticle.save();
			await updateFeaturedarticlesCache();
			res.json(updatedarticle);
		} else {
			res.status(404).json({ message: "article not found" });
		}
	} catch (error) {
		console.log("Error in toggleFeaturedarticle controller", error.message);
		res.status(500).json({ message: "Server error" });
	}
};

async function updateFeaturedarticlesCache() {
	try {
		// The lean() method  is used to return plain JavaScript objects instead of full Mongoose documents. This can significantly improve performance

		const featuredarticles = await article.find({ isFeatured: true }).lean();
		await redis.set("featured_articles", JSON.stringify(featuredarticles));
	} catch (error) {
		console.log("error in update cache function");
	}
}

export const updatearticle = async (req, res) => {
	try {
		const data = req.body;


		const dbarticle = await article.findById(req.body.id);

		if (!dbarticle) {
			return (
				res.status(400).json({ message: "no article found" }));
		}

		const theid = dbarticle._id
		const uparticle = await article.findByIdAndUpdate(
			theid,
			data,
			{ new: true }
		);

		res.status(200).json(uparticle);
	} catch (error) {
		console.log("Error in updatearticle controller", error.message);
		res.status(500).json({ message: "Server error" });
	}
};