import { useEffect } from "react";
import { useArticleStore } from "../stores/useArticleStore";
import { motion } from "framer-motion";
import Plogs from "../components/Plogs";
import "../../public/css/plogs.css"

const PlogsPage = () => {
	const { fetchAllArticles, Articles } = useArticleStore();


	useEffect(() => {
		fetchAllArticles(Articles);
	}, [fetchAllArticles , Articles]);
	return (
		<div className='min-h-screen'>
			<div className='relative z-10 sm:px-6 lg:px-8 py-16'>
				<motion.h1
					className='text-center text-4xl sm:text-5xl font-bold text-purple-800 mb-8'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
				</motion.h1>

				<motion.div
					className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 justify-items-center'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					{Articles?.length === 0 && (
						<h2 className='text-3xl font-semibold text-gray-300 text-center col-span-full'>
							No Articles found
						</h2>
					)}
					{Articles.map((article) => (
						<Plogs key={article._id} article={article} />
					))}
				</motion.div>
			</div>
		</div>
	);
};
export default PlogsPage;
