import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import toast from "react-hot-toast";

const categories = ["Lavand", "Lavant"];
const genders = ["Male", "Female"];

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    code: "",
    description: "",
    details: "",
    price: "",
    gender: "",
    color: "",
    category: "",
    main_image:"",
    image: "",
  });

  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({
        name: "",
        code: "",
        description: "",
        details: "",
        price: "",
        gender: "",
        color: "",
        category: "",
        main_image:"",
        image: "",
      });
      toast.success("Product created successfully");
    } catch {
      console.log("error creating a product");
    }
  };

  const handlemainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewProduct({ ...newProduct, main_image: reader.result });
      };
      reader.readAsDataURL(file); // base6.4
    }
  };
    const handleImageChange = (e) => {
  const files = e.target.files;
  const imagePromises = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    const promise = new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file); // base64
    });

    imagePromises.push(promise);
  }

  Promise.all(imagePromises).then((images) => {
    setNewProduct({ ...newProduct, image: images });
  });
};

  // const handleImageChange = (e) => {
  //   const files = e.target.files;
  //   const images = [];
  
  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i];
  //     const reader = new FileReader();
  
  //     reader.onloadend = () => {
  //       images.push(reader.result);
  //       setNewProduct({ ...newProduct, image: images });
  //     };
  
  //     reader.readAsDataURL(file); // base64
  //   }
  // };
  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-purple-800">
        Create New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="code"
            className="block text-sm font-medium text-gray-300"
          >
            Product code
          </label>
          <input
            type="text"
            id="code"
            name="code"
            value={newProduct.code}
            onChange={(e) =>
              setNewProduct({ ...newProduct, code: e.target.value })
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
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
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
            htmlFor="details"
            className="block text-sm font-medium text-gray-300"
          >
            details
          </label>
          <textarea
            id="details"
            name="details"
            value={newProduct.details}
            onChange={(e) =>
              setNewProduct({ ...newProduct, details: e.target.value })
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
            htmlFor="color"
            className="block text-sm font-medium text-gray-300"
          >
            Product color
          </label>
          <input
            type="text"
            id="color"
            name="color"
            value={newProduct.color}
            onChange={(e) =>
              setNewProduct({ ...newProduct, color: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-300"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            step="0.01"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm 
						py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500
						 focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-300"
          >
            gender
          </label>
          <select
            id="gender"
            name="gender"
            value={newProduct.gender}
            onChange={(e) =>
              setNewProduct({ ...newProduct, gender: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md
						 shadow-sm py-2 px-3 text-white focus:outline-none 
						 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            required
          >
            <option value="">Select a gender</option>
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-300"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md
						 shadow-sm py-2 px-3 text-white focus:outline-none 
						 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-1 flex items-center">
          <input
            type="file"
            id="main_image"
            className="sr-only"
            accept="image/*"
            onChange={handlemainImageChange}
          />
          <label
            htmlFor="main_image"
            className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <Upload className="h-5 w-5 inline-block mr-2" />
            Upload Image
          </label>
          {newProduct.main_image && (
            <span className="ml-3 text-sm text-gray-400">main image uploaded </span>
          )}
        </div>

<div className="mt-1 flex items-center">
  <input
    type="file"
    id="image"
    className="sr-only"
    accept="image/*"
    multiple
    onChange={handleImageChange}
  />
  <label
    htmlFor="image"
    className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
  >
    <Upload className="h-5 w-5 inline-block mr-2" />
    Upload Images
  </label>
  {newProduct.image.length > 0 && (
    <div className="flex flex-wrap">
      {newProduct.image.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Uploaded image ${index + 1}`}
          className="w-20 h-20 mr-2 mb-2"
        />
      ))}
    </div>
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
              Create Product
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};
export default CreateProductForm;

