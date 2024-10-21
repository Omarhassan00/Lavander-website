import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import "../../public/css/Brand_product.css";
import { Link } from "react-router-dom";

const Product_page = () => {
  const { fetchFeaturedProducts, products, loading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="relative min-h-screen text-gray-800 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto mt-7 px-4 sm:px-6 lg:px-8 py-16">
        {!loading && products.length > 0 && (
          <FeaturedProducts featuredProducts={products} />
        )}

          <h1 className="text-center text-5xl sm:text-6xl my-8 font-bold text-purple-600 mb-4">
            Explore Our Brands
          </h1>
        <div className="brand-Product grid grid-cols-2 mx-auto px-4 sm:grid-cols-2 lg:grid-cols-2 gap-32 max-h-full">

          <Link to="/category/Lavant">
            <div className="navigation-Product">
              <div className="menuToggle-Pro"></div>
            </div>
          </Link>
          <Link to="/category/Lavand">
            <div className="navigation-Product1">
              <div className="menuToggle1-Pro"></div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Product_page;
