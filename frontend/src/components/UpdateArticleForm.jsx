import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useArticleStore } from "../stores/useArticleStore";
import toast from "react-hot-toast";

const UpdateArticleForm = (article) => {
  const [Thearticle, setArticle] = useState({
    id: article.article._id,
    title: article.article.title,
    description: article.article.description,
    facebook: article.article.facebook,
    instagram: article.article.instagram,
    tiktok: article.article.tiktok,
    website: article.article.website,
    image: article.article.image,
  });

  const { updateArticle, loading } = useArticleStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateArticle(Thearticle);
      setArticle({
        id: article.article._id,
        title: "",
        description: "",
        facebook: "",
        instagram: "",
        tiktok: "",
        website: "",
        image: "",
      });
      window.location.reload();
    } catch {
      toast.error("error updating article");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setArticle({ ...Thearticle, image: reader.result });
      };

      reader.readAsDataURL(file); // base64
    }
  };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-purple-800">
        update Article
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-300"
          >
            Article Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={Thearticle.title}
            onChange={(e) =>
              setArticle({ ...Thearticle, title: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={Thearticle.description}
            onChange={(e) =>
              setArticle({ ...Thearticle, description: e.target.value })
            }
            rows="3"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm
						 py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 
						 focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="facebook"
            className="block text-sm font-medium text-gray-300"
          >
            Facebook
          </label>
          <textarea
            id="facebook"
            name="facebook"
            value={Thearticle.facebook}
            onChange={(e) =>
              setArticle({ ...Thearticle, facebook: e.target.value })
            }
            rows="3"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm
						 py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 
						 focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="instagram"
            className="block text-sm font-medium text-gray-300"
          >
            Instagram
          </label>
          <input
            type="text"
            id="instagram"
            name="instagram"
            value={Thearticle.instagram}
            onChange={(e) =>
              setArticle({ ...Thearticle, instagram: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="tiktok"
            className="block text-sm font-medium text-gray-300"
          >
            Tiktok
          </label>
          <input
            type="text"
            id="tiktok"
            name="tiktok"
            value={Thearticle.tiktok}
            onChange={(e) =>
              setArticle({ ...Thearticle, tiktok: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="website"
            className="block text-sm font-medium text-gray-300"
          >
            Website
          </label>
          <input
            type="text"
            id="website"
            name="website"
            value={Thearticle.website}
            onChange={(e) =>
              setArticle({ ...Thearticle, website: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>

        <div className="mt-1 flex items-center">
          <input
            type="file"
            id="image"
            className="sr-only"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image"
            className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <Upload className="h-5 w-5 inline-block mr-2" />
            Upload Image
          </label>
          {Thearticle.image && (
            <span className="ml-3 text-sm text-gray-400">Image uploaded </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
					shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader
                className="mr-2 h-5 w-5 animate-spin"
                aria-hidden="true"
              />
              Loading...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-5 w-5" />
              Update article
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};
export default UpdateArticleForm;
