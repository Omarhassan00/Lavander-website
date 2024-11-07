import { redis } from "../lib/redis.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import Order from "../models/order.model.js";
import SibApiV3Sdk from "sib-api-v3-sdk";
import bcrypt from "bcryptjs";



const generateTokens = (userId) => {
	const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "60m",
	});

	const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: "7d",
	});

	return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
	await redis.set(`refresh_token:${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60); // 7days
};

const setCookies = (res, accessToken, refreshToken) => {
	res.cookie("accessToken", accessToken, {
		httpOnly: true, // prevent XSS attacks, cross site scripting attack
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
		maxAge: 15 * 60 * 1000, // 15 minutes
	});
	res.cookie("refreshToken", refreshToken, {
		httpOnly: true, // prevent XSS attacks, cross site scripting attack
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	});
};

export const signup = async (req, res) => {
	const { Frist_Name, Last_Name, County, city, address, DateOfBirth, gender, number, email, password } = req.body;
	try {
		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.status(400).json({ message: "User already exists" });
		}
		const user = await User.create({ Frist_Name, Last_Name, County, city, address, DateOfBirth, gender, number, email, password });

		// authenticate
		const { accessToken, refreshToken } = generateTokens(user._id);
		await storeRefreshToken(user._id, refreshToken);

		sendverifyEmailsign({ email, id: user._id, Frist_Name, Last_Name })

		setCookies(res, accessToken, refreshToken);


		res.status(201).json({
			_id: user._id,
			name: user.Frist_Name,
			email: user.email,
		});
	} catch (error) {
		console.log("Error in signup controller");
		res.status(500).json({ message: "server error"});
	}
};

export const sendverifyEmailsign = async ({ email, id, Frist_Name, Last_Name }) => {

	const verifytoken = jwt.sign({ userId: id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "7d",
	});

	const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

	await tranEmailApi.sendTransacEmail({
		sender: { "name": "Lavander life", "email": "lavanderlifeforleatherproducts@gmail.com" },
		to: [{ "name": `${Frist_Name} ${Last_Name}`, "email": `${email}` }],
		subject: "verify your account",
		htmlContent: ` <h2>Verify Your Account</h2>
		<p>Dear ${Frist_Name},</p>
		</br>
		<p>Thank you for creating an account on our website.</br> You are in the last step to verify your email address:</p>
		</br><button style="background: linear-gradient(to top, #7300ff, #ffffff);padding:20px 50px;border-radius:20px;color: aliceblue;font-weight: 500;font-size: 1.1em;"><a style="list-style:none;text-decoration: none;color: aliceblue;font-weight: 500;font-size: 1.1em;" href="https://api.lavanderleatherproducts.net/api/auth/verifyemail/${verifytoken}">Back To Lavander Life</a></button>
		</br><p>If you did not create an account, please ignore email.</p></br>
		<p>Best regards,</p></br>
		<p>Lavander website</p>`
	})

}
export const sendverifyEmail = async (req , res) => {

	try{

	const { email, id, Frist_Name, Last_Name } = req.body

	const verifytoken = jwt.sign({ userId: id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "7d",
	});

	const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

	await tranEmailApi.sendTransacEmail({
		sender: { "name": "Lavander life", "email": "lavanderlifeforleatherproducts@gmail.com" },
		to: [{ "name": `${Frist_Name} ${Last_Name}`, "email": `${email}` }],
		subject: "verify your account",
		htmlContent: ` <h2>Verify Your Account</h2>
		<p>Dear ${Frist_Name},</p>
		</br>
		<p>Thank you for creating an account on our website.</br> You are in the last step to verify your email address:</p>
		<button style="background: linear-gradient(to top, #7300ff, #ffffff);padding:20px 50px;border-radius:20px;color: aliceblue;font-weight: 500;font-size: 1.1em;"><a style="list-style:none;text-decoration: none;" href="https://api.lavanderleatherproducts.net/api/auth/verifyemail/${verifytoken}">Back To Lavander Life</a></button>
		</br><p>If you did not create an account, please ignore email.</p>
		</br><p>Best regards,</p>
		<p>Lavander website</p>`
	})

	res.status(200).json({message : "email sent"});

	}
	catch(error){
		res.status(500).json({message : "email not sent"});
	}

}

export const checkverifyEmail = async (req, res) => {

	const verificationToken = req.params.token;
	try {
		const decoded = jwt.verify(verificationToken, process.env.ACCESS_TOKEN_SECRET);
		const user = await User.findById(decoded.userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		user.isverify = true;
		await user.save();
		res.status(200).redirect(process.env.CLIENT_URL+"/landingpage");
	} catch (error) {
		res.status(500).json({ message: "Error verifying account" });
	}
}

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (user && (await user.comparePassword(password))) {
			const { accessToken, refreshToken } = generateTokens(user._id);
			await storeRefreshToken(user._id, refreshToken);
			setCookies(res, accessToken, refreshToken);

			res.json({
				_id: user._id,
				name: user.Frist_Name,
				email: user.email,
				role: user.role,
			});
		} else {
			res.status(400).json({ message: "Invalid email or password" });
		}
	} catch (error) {
		console.log("Error in login controller");
		res.status(500).json({ message: "server error"});
	}
};

export const logout = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;
		if (refreshToken) {
			const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
			await redis.del(`refresh_token:${decoded.userId}`);
		}

		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");
		res.json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller");
		res.status(500).json({ message: "Server error"});
	}
};

// this will refresh the access token
export const refreshToken = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			return res.status(401).json({ message: "No refresh token provided" });
		}

		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

		if (storedToken !== refreshToken) {
			return res.status(401).json({ message: "Invalid refresh token" });
		}

		const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60m" });

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 15 * 60 * 1000,
		});

		res.json({ message: "Token refreshed successfully" });
	} catch (error) {
		console.log("Error in refreshToken controller");
		res.status(500).json({ message: "Server error"});
	}
};

export const getProfile = async (req, res) => {
	try {
		const user = req.user;
		if (!user) {
			return res.status(400).redirect("https://www.google.com");
		}
		res.json(req.user);
	} catch (error) {
		res.status(500).json({ message: "Server error"});
	}
};


export const UpdateAdminRole = async (req, res) => {
	const { id, password, role } = req.body;
	try {
		const userExists = await User.findOne(id);

		if (!userExists) {
			return res.status(400).json({ message: "can't find user" });
		}

		if (userExists && (await req.user.comparePassword(password))) {

			await User.findByIdAndUpdate(id, role);
			const newuser = await User.findOne(id).select("-password");

			res.status(201).json({
				newuser
			});
		}
		else {
			res.status(400).json({ message: "Invalid password" });
		}
	} catch (error) {
		console.log("Error in updateuser controller");
		res.status(500).json({ message: "DataBase Error" });
	}
};


export const updateuser = async (req, res) => {
	try {
		const data = req.body;

		const id = req.body.id
		const theuser = await User.findById(req.body.id).select("-password");

		if (!theuser) {
			return (
				res.status(400).json({ message: "no user found" }));
		}

		const theid = theuser._id
		const user = await User.findByIdAndUpdate(
			theid,
			data,
			{ new: true }
		);

		res.status(200).json(user);
	} catch (error) {
		console.log("Error in updateuser controller");
		res.status(500).json({ message: "Server error" });
	}
};

export const deletuser = async (req, res) => {

	try {
		const userExists = await User.findById(req.params.id);
		if (!userExists) {
			return res.status(400).json({ message: "can't find user" });
		}
		await User.findByIdAndDelete(req.params.id);
		res.status(201).json({
			message: "user deleted successfully"
		});
	} catch (error) {
		console.log("Error in deletuser controller");
		res.status(500).json({ message: "DataBase Error" });
	}
};


export const userhistory = async (req, res) => {
	try {
		const orders = await Order.find({ user: req.user._id });
		res.json(orders);
	} catch (error) {
		console.log("Error in history controller");
		res.status(500).json({ message: "Server error"});
	}
};

export const getAllusers = async (req, res) => {
	try {
		const users = await User.find({}).select("-password"); // find all users
		res.json({ users });
	} catch (error) {
		console.log("Error in getAllusers controller");
		res.status(500).json({ message: "Server error" });
	}
};

export const updateuserpass = async (req, res) => {
	try {
		const { old_password, new_password ,email} = req.body;
		
		const userExists = await User.findOne({email});

		console.log({email})


		if (!userExists) {
			return (
				res.status(400).json({ message: "no user found" }));
		}
		const isMatch = await bcrypt.compare(old_password, userExists.password);


		if (!isMatch) {
			return (
				res.status(400).json({ message: "old password wrong" }));
		}
		userExists.password = new_password
		await userExists.save()
		res.status(200).json({ message: "password updated succesfully" });
	} catch (error) {
		console.log("Error in updateuserpassword controller");
		res.status(500).json({ message: "server error"});
	}

}

export const sendemail = async (req, res) => {

	const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();
	try {

		await tranEmailApi.sendTransacEmail({
			sender: { "name": "omar hassan", "email": "omarhassan00123@gmail.com" },
			to: [{ "name": "loay ashraf", "email": "loayoffice80@gmail.com" }],
			subject: "confegration test to sending email",
			htmlContent: ` <h2>Verify Your Account</h2>
        <p>Dear Loay,</p>
		<img style="position: absolute" src="https://wallpapers.com/images/high/email-1600-x-1200-picture-x0e3iceefpddzhcn.webp" alt="not found">
        <p>Thank you for creating an account on our website. To complete your registration, please click on the link below to verify your email address:</p>
        <p><a href="https://www.google.com">Verify My Account</a></p>
        <p>If you did not create an account, please ignore this email.</p>
        <p>Best regards,</p>
        <p>Your Website Name</p>`
		})

		res.status(200).send("email sent")
	}
	catch (error) {
		res.status(500).send("email not sent" + error)
	}

}

export const forgetmypassword = async (req, res) => {

	try{

	const { email } = req.body;

	const user = await User.findOne({ email });
	console.log(req.body)
	if (!user) {
		return res.status(400).json({ message: "can't find user" });
	}

	const random_pass = Math.random().toString(36).substring(2, 8).toUpperCase()
	console.log(random_pass)
	user.password = random_pass
	await user.save()

	const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

	await tranEmailApi.sendTransacEmail({
		sender: { "name": "Lavander life", "email": "lavanderlifeforleatherproducts@gmail.com" },
		to: [{ "name": `${user.Frist_Name} ${user.Last_Name}`, "email": `${user.email}` }],
		subject: "Forgit your password",
		htmlContent: ` <h2>we Changed your password succesfully</h2>
			<p>Dear ${user.Frist_Name},</p>
			</br>
			<p>Congratulation we changed Your password Succesfully</p>
			</br>
			<p>Your now password is : <b>${random_pass}</b></p>
			<p>please git sign in with this password then change it as soon as possible</p>
			<p>Best regards,</p>
			<p>Lavander website</p>`
	})
	res.status(200).json({ message: "Please check your Email" });

	}
	catch(error){
		res.status(500).json({message: "email not sent"})
	}
}
