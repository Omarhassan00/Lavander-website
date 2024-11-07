import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		code: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		details: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			min: 0,
			required: true,
		},
		gender: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
		main_image: {
			type: String,
		},
		image: [{
			type: String,
			required: [true, "Image is required"],
		}],
		category: {
			type: String,
			required: true,
		},
		isFeatured: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
