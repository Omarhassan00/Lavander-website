import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
	user: null,
	loading: false,
	checkingAuth: true,
	users: [],

	setUsers: (users) => set({ users }),
	fetchAllUsers: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/auth/users");
			set({ users: response.data.users, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch users", loading: false });
			toast.error(error.response.data.error || "Failed to fetch users");
		}
	},
	signup: async ({ Frist_Name, Last_Name, County, city, address, DateOfBirth, gender, number, email, password, confirmPassword }) => {
		set({ loading: true });

		if (password !== confirmPassword) {
			set({ loading: false });
			return toast.error("Passwords do not match");
		}

		try {
			const res = await axios.post("/auth/signup", { Frist_Name, Last_Name, County, city, address, DateOfBirth, gender, number, email, password });
			set({ user: res.data, loading: false });
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.message || "An error occurred lll");
		}
	},
	updatePass: async ({ old_password, new_password, confirmnewPassword },{email}) => {
		set({ loading: true });

		if (new_password !== confirmnewPassword) {
			set({ loading: false });
			return toast.error("Passwords do not match");
		}

		try {
			await axios.post("/auth/updatepass", { old_password, new_password , email});
			set({ loading: false });
			toast.success("updated succsefully");
			
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.message || "An error occurred lll");
		}
	},
	login: async (email, password) => {
		set({ loading: true });

		try {
			const res = await axios.post("/auth/login", { email, password });

			set({ user: res.data, loading: false });
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.message || "An error occurred");
		}
	},

	logout: async () => {
		try {
			await axios.post("/auth/logout");
			set({ user: null });
		} catch (error) {
			toast.error(error.response?.data?.message || "An error occurred during logout");
		}
	},

	checkAuth: async () => {
		set({ checkingAuth: true });
		try {
			const response = await axios.get("/auth/profile");
			set({ user: response.data, checkingAuth: false });
		} catch (error) {
			console.log(error.message);
			set({ checkingAuth: false, user: null });
		}
	},

	refreshToken: async () => {
		// Prevent multiple simultaneous refresh attempts
		if (get().checkingAuth) return;

		set({ checkingAuth: true });
		try {
			const response = await axios.post("/auth/refresh-token");
			set({ checkingAuth: false });
			return response.data;
		} catch (error) {
			set({ user: null, checkingAuth: false });
			throw error;
		}
	},
	// for admin
	updateUser: async (Theuser) => {
		set({ loading: true });
		try {
			console.log(Theuser)
			await axios.put("/auth/profile", Theuser);
			const response = await axios.get("/auth/users");
			set({ users: response.data.users, loading: false });
			toast.success("updated succsefully")
		} catch (error) {
			toast.error(error.response.data.error);
			set({ loading: false });
		}
	},

	// for user
	updateoneUser: async (Theuser) => {
		set({ loading: true });
		try {
			console.log(Theuser)
			await axios.put("/auth/profile", Theuser);
			const response = await axios.get("/auth/profile");
			set({ users: response.data.user, loading: false });
			toast.success("updated succsefully")
		} catch (error) {
			toast.error(error.response.data.error);
			set({ loading: false });
		}
	},



	deleteUser: async (UserId) => {
		set({ loading: true });
		try {
			await axios.delete(`/auth/profile/${UserId}`);
			set((prevusers) => ({
				users: prevusers.users.filter((user) => user._id !== UserId),
				loading: false,
			}));
			toast.success("deleted succsefully")
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to delete User");
		}
	},
	contactUs: async ({ fullname, email, message }) => {
		set({ loading: true });
		try {
			const res = await axios.post("/contactus", { fullname, email, message });
			set({ loading: false });
			toast.success(res.data.message);
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.message || "An error occurred loay");
		}
	},

	verifyemail: async (user) => {
		set({ loading: true });
		try {
			const res = await axios.post("/auth/sendverifyemail", { email : user.email, id: user._id, Frist_Name : user.Frist_Name, Last_Name:user.Last_Name });
			set({ loading: false });
			toast.success(res.data.message);
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.message || "An error occurred loay");
		}
	},

	forgetpass: async (email) => {
		set({ loading: true });
		try {
			const res = await axios.post("/auth/forgetpass", { email });
			set({ loading: false });
			toast.success(res.data.message);
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.message || "An error occurred loay");
		}
	},
}));

// TODO: Implement the axios interceptors for refreshing access token

// Axios interceptor for token refresh
let refreshPromise = null;

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// If a refresh is already in progress, wait for it to complete
				if (refreshPromise) {
					await refreshPromise;
					return axios(originalRequest);
				}

				// Start a new refresh process
				refreshPromise = useUserStore.getState().refreshToken();
				await refreshPromise;
				refreshPromise = null;

				return axios(originalRequest);
			} catch (refreshError) {
				// If refresh fails, redirect to login or handle as needed
				useUserStore.getState().logout();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}


);
