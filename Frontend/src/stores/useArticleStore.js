import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useArticleStore = create((set) => ({
	Articles: [],
	loading: false,

	setArticles: (Articles) => set({ Articles }),
	createArticle: async (ArticleData) => {
		set({ loading: true });
		try {
			const res = await axios.post("/articles", ArticleData);
			set((prevState) => ({
				Articles: [...prevState.Articles, res.data],
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response.data.error);
			set({ loading: false });
		}
	},
	fetchAllArticles: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/articles");
			set({ Articles: response.data.articles, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch Articles", loading: false });
			toast.error(error.response.data.error || "Failed to fetch Articles");
		}
	},
	deleteArticle: async (ArticleId) => {
		set({ loading: true });
		try {
			await axios.delete(`/articles/${ArticleId}`);
			set((prevArticles) => ({
				Articles: prevArticles.Articles.filter((Article) => Article._id !== ArticleId),
				loading: false,
			}));
			toast.success("Article deleted succsefully")
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to delete Article");
		}
	},
	toggleFeaturedArticle: async (articleId) => {
		set({ loading: true });
		try {
			const response = await axios.patch(`/articles/${articleId}`);
			// this will update the isFeatured prop of the Article
			set((prevArticles) => ({
				Articles: prevArticles.Articles.map((Article) =>
					Article._id === articleId ? { ...Article, isFeatured: response.data.isFeatured } : Article
				),
				loading: false,
			}));
			toast.success("featured succsefully")
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to update Article");
		}
	},
	fetchFeaturedArticles: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/articles/featured");
			set({ Articles: response.data, loading: false });
			// toast.success("fetch success")
		} catch (error) {
			set({ error: "Failed to fetch Articles", loading: false });
			console.log("Error fetching featured Articles:", error);
		}

	},
	updateArticle: async (Thearticle) => {
		set({ loading: true });
		try {
			console.log(Thearticle)
			await axios.put("/articles", Thearticle);
			const response = await axios.get("/articles");
			set({ Articles: response.data.articles, loading: false });			
			toast.success("updated succsefully")
		} catch (error) {
			toast.error(error.response.data.error);
			set({ loading: false });
		}
	},

}));


