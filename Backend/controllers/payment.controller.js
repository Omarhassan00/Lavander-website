// import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import { stripe } from "../lib/stripe.js";

export const createCheckoutSession = async (req, res) => {
	try {
		const { products } = req.body;
		const user = req.user

		if (!user.isverify) {
			return res.status(400).json({ message: "Please verify your account" });
		}

		if (!Array.isArray(products) || products.length === 0) {
			return res.status(400).json({ error: "Invalid or empty products array" });
		}

		let totalAmount = 0;

		const lineItems = products.map((product) => {
			const amount = Math.round(product.price * 100); // stripe wants u to send in the format of cents
			totalAmount += amount * product.quantity;

			return {
				price_data: {
					currency: "usd",
					product_data: {
						name: product.name,
					},
					unit_amount: amount,
				},
				quantity: product.quantity || 1,
			};
		});

		// let coupon = null;
		// if (couponCode) {
		// 	coupon = await Coupon.findOne({ code: couponCode, userId: req.user._id, isActive: true });
		// 	if (coupon) {
		// 		totalAmount -= Math.round((totalAmount * coupon.discountPercentage) / 100);
		// 	}
		// }

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: lineItems,
			mode: "payment",
			success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
			// discounts: coupon
			// 	? [
			// 		{
			// 			coupon: await createStripeCoupon(coupon.discountPercentage),
			// 		},
			// 	]
			// 	: [],
			metadata: {
				userId: req.user._id.toString(),
				// couponCode: couponCode || "",
				products: JSON.stringify(
					products.map((p) => ({
						id: p._id,
						quantity: p.quantity,
						price: p.price,
					}))
				),
			},
		});

		// if (totalAmount >= 20000) {
		// 	await createNewCoupon(req.user._id);
		// }
		res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 });
	} catch (error) {
		console.error("Error processing checkout:", error);
		res.status(500).json({ message: "Error processing checkout", error: error.message });
	}
};

export const checkoutSuccess = async (req, res) => {
	try {
		const { sessionId } = req.body;
		const session = await stripe.checkout.sessions.retrieve(sessionId);

		if (session.payment_status === "paid") {
			// if (session.metadata.couponCode) {
			// await Coupon.findOneAndUpdate(
			// 	{
			// code: session.metadata.couponCode,
			// userId: session.metadata.userId,

			// {
			// 	isActive: false,
			// }



			// create a new Order
			const products = JSON.parse(session.metadata.products);
			const newOrder = new Order({
				user: session.metadata.userId,
				products: products.map((product) => ({
					product: product.id,
					productname: product.name,
					productimage: product.image,
					quantity: product.quantity,
					price: product.price,
				})),
				totalAmount: session.amount_total / 100, // convert from cents to dollars,
				stripeSessionId: sessionId,
			});

			await newOrder.save();

			const user = req.user;

			const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

			await tranEmailApi.sendTransacEmail({
				sender: { "name": "Lavander Website", "email": "omarhassan00123@gmail.com" },
				to: [{ "name": `${user.Frist_Name} ${user.Last_Name}`, "email": `${user.email}` }],
				subject: "order confirmetion",
				htmlContent: ` <h2>your order confermed</h2>
			<p>Dear ${user.Frist_Name},</p>
			</br>
			<p>Thank you for chosen our brand.</p>
			<p>your order confermed succesfully with order number : ${sessionId}</p>
			<p>If you had any proplem please let us know.</p>
			<p>Best regards,</p>
			<p>Lavander website</p>`
			})

			await tranEmailApi.sendTransacEmail({
				sender: { "name": "Lavander Website", "email": "omarhassan00123@gmail.com" },
				to: [{ "name": `loay ashraf`, "email": `loayoffice80@gmail.com` }],
				subject: "verify your account",
				htmlContent: ` <h2>Verify Your Account</h2>
			<p>Dear Loay,</p>
			</br>
			<p>there is a new order created from : ${user.email}</p>
			<p>with order number : ${sessionId}</p>
			<p>the order is :</p>
			<pre>${newOrder}</pre>
			</br>
			<p>Best regards,</p>
			<p>Lavander website IT</p>`
			})

			user.cartItems = [];
			await user.save();

			res.status(200).json({
				success: true,
				message: "Payment successful, order created, and coupon deactivated if used.",
				orderId: newOrder._id,
			});
		}
	} catch (error) {
		console.error("Error processing successful checkout:", error);
		res.status(500).json({ message: "Error processing successful checkout", error: error.message });
	}
};

// async function createStripeCoupon(discountPercentage) {
// 	const coupon = await stripe.coupons.create({
// 		percent_off: discountPercentage,
// 		duration: "once",
// 	});

// 	return coupon.id;
// }

// async function createNewCoupon(userId) {
// 	await Coupon.findOneAndDelete({ userId });

// 	const newCoupon = new Coupon({
// 		code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
// 		discountPercentage: 10,
// 		expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
// 		userId: userId,
// 	});

// 	await newCoupon.save();

// 	return newCoupon;
// }
