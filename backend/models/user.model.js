import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		Frist_Name: {
			type: String,
			required: [true, "Frist Name is required"],
		},
		Last_Name: {
			type: String,
			required: [true, "Last Name is required"],
		},
		County: {
			type: String,
			required: [true, "County is required"],
		},
		city: {
			type: String,
			required: [true, "city is required"],
		},
		address: {
			type: String,
			required: [true, "address is required"],
		},
		DateOfBirth: {
			type: String,
			required: [true, "DateOfBirth is required"],
		},
		gender: {
			type: String,
			required: [true, "gender is required"],
		},
		number: {
			type: Number,
			required: [true, "number is required"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: [6, "Password must be at least 6 characters long"],
		},
		cartItems: [
			{
				quantity: {
					type: Number,
					default: 1,
				},
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
				},
			},
		],
		role: {
			type: String,
			enum: ["customer", "admin"],
			default: "customer",
		},
		isverify: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

// Pre-save hook to hash password before saving to database
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (error) {
		next(error);
	}
});

userSchema.methods.comparePassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
