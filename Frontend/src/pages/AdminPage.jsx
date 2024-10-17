import { BaggageClaim, BarChart, ClipboardEditIcon, PlusCircle, ShoppingBasket, UserRoundSearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import CreateArticleForm from "../components/CreateArticleForm";
import ProductsList from "../components/ProductsList";
import UsersList from "../components/UsersList";
import OrdersList from "../components/OrdersList";
import { useProductStore } from "../stores/useProductStore";
import { useArticleStore } from "../stores/useArticleStore";
import { useUserStore } from "../stores/useUserStore";
import ArticlesList from "../components/ArticlesList";

const tabs = [
	{ id: "create", label: "Create Article", icon: PlusCircle },
	{ id: "createProduct", label: "Create Product", icon: PlusCircle },
	{ id: "Articles", label: "Articles", icon: ClipboardEditIcon },
	{ id: "products", label: "Products", icon: ShoppingBasket },
	{ id: "Users", label: "All Users", icon: UserRoundSearchIcon },
	{ id: "Orders", label: "All Orders", icon: BaggageClaim },
	{ id: "analytics", label: "Analytics", icon: BarChart },
];

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState("create");
	const { fetchAllProducts , fetchAllOrders} = useProductStore();
	const { fetchAllArticles } = useArticleStore();
	const { fetchAllUsers } = useUserStore();
	window.scrollTo({
        top: 0,
  })
	useEffect(() => {fetchAllArticles(),
		fetchAllProducts(),
		fetchAllOrders(),
		fetchAllUsers();
	}, [fetchAllArticles,fetchAllProducts, fetchAllOrders,fetchAllUsers]);

	return (
		<div className='min-h-screen relative overflow-hidden'>
			<div className='relative z-10 container mx-auto mt-9 px-4 py-16'>
				<motion.h1
					className='text-4xl font-bold mb-8 text-purple-800 text-center'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					Admin Dashboard
				</motion.h1>

				<div className='flex flex-wrap justify-center gap-3 mb-8'>
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
								activeTab === tab.id
									? "bg-purple-600 text-white"
									: "bg-gray-700 text-gray-300 hover:bg-gray-600"
							}`}
						>
							<tab.icon className='mr-2 h-5 w-5' />
							{tab.label}
						</button>
					))}
				</div>
				{activeTab === "create" && <CreateArticleForm />}
				{activeTab === "createProduct" && <CreateProductForm />}
				{activeTab === "Articles" && <ArticlesList />}
				{activeTab === "products" && <ProductsList />}
				{activeTab === "Users" && <UsersList />}
				{activeTab === "Orders" && <OrdersList />}
				{activeTab === "analytics" && <AnalyticsTab />}
			</div>
		</div>
	);
};
export default AdminPage;
