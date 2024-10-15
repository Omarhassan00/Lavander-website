import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
	orders: [],
	products: [],
	loading: false,

	setProducts: (products) => set({ products }),
	createProduct: async (productData) => {
		set({ loading: true });
		try {
			const res = await axios.post("/products", productData);
			set((prevState) => ({
				products: [...prevState.products, res.data],
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response.data.error);
			set({ loading: false });
		}
	},


	fetchAllProducts: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/products");
			set({ products: response.data.products, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			toast.error(error.response.data.error || "Failed to fetch products");
		}
	},

	fetchProductsByCategory: async (category) => {
		set({ loading: true });
		try {
			const response = await axios.get(`/products/category/${category}`);
			set({ products: response.data.products, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			toast.error(error.response.data.error || "Failed to fetch products");
		}
	},

	updateProduct: async (Theproduct) => {
		set({ loading: true });
		try {
			console.log(Theproduct)
			await axios.put("/products", Theproduct);
			const response = await axios.get("/products");
			set({ products: response.data.products, loading: false });
			toast.success("updated succsefully")
		} catch (error) {
			toast.error(error.response.data.error);
			set({ loading: false });
		}
	},

	deleteProduct: async (productId) => {
		set({ loading: true });
		try {
			await axios.delete(`/products/${productId}`);
			set((prevProducts) => ({
				products: prevProducts.products.filter((product) => product._id !== productId),
				loading: false,
			}));
			toast.success("Product deleted successfully");
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to delete product");
		}
	},
	toggleFeaturedProduct: async (productId) => {
		set({ loading: true });
		try {
			const response = await axios.patch(`/products/${productId}`);
			// this will update the isFeatured prop of the product
			set((prevProducts) => ({
				products: prevProducts.products.map((product) =>
					product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
				),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to update product");
		}
	},
	fetchFeaturedProducts: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/products/featured");
			set({ products: response.data, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			console.log("Error fetching featured products:", error);
		}
	},
	toggleFeaturedOrder: async (orderId) => {
		set({ loading: true });
		try {
			const response = await axios.patch(`/analytics/${orderId}`);
			// this will update the isFeatured prop of the order
			set((prevOrders) => ({
				orders: prevOrders.orders.map((order) =>
					order._id === orderId ? { ...order, isFeatured: response.data.isFeatured } : order
				),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to update order");
		}
	},
	fetchFeaturedOrders: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/analytics/featured");
			set({ orders: response.data, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch orders", loading: false });
			console.log("Error fetching featured orders:", error);
		}
	},

	fetchAllOrders: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/analytics/orders");
			set({ orders: response.data.orders, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch orders", loading: false });
			toast.error(error.response.data.error || "Failed to fetch orders");
		}
	},

	fetchuserOrders: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/auth/history");
			set({ orders: response.data.orders, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch orders", loading: false });
			toast.error(error.response.data.error || "Failed to fetch orders");
		}
	},

	fetchProductsBygenderlavand: async(gender) => {
		set({ loading: true });
		try {
			const response = await axios.get(`/products/lavand/${gender}`);
			set({ products: response.data.products, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			toast.error(error.response.data.error || "Failed to fetch products");
		}
	},
	fetchProductsBygenderlavant: async(gender) => {
		set({ loading: true });
		try {
			const response = await axios.get(`/products/lavant/${gender}`);
			set({ products: response.data.products, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			toast.error(error.response.data.error || "Failed to fetch products");
		}
	},
}));

