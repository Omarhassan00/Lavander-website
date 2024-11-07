import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "title is required"],
		},
		description: {
			type: String,
			required: [true, "description is required"],
		},
		image: {
			type: String,
			required: [true, "Image is required"],
		},
		facebook: {
			type: String,
		},
		instagram: {
			type: String,
		},
		tiktok: {
			type: String,
		},
		website: {
			type: String,
		},
		isFeatured: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const article = mongoose.model("article", articleSchema);

export default article;
