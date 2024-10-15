import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../../public/css/Featured.css"
import SpiltArticles from "./SplitArticles";

const FeaturedArticle = ({ featuredArticle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(1);
      else if (window.innerWidth < 1280) setItemsPerPage(1);
      else setItemsPerPage(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
  };

  const isStartDisabled = currentIndex === 0;
  const isEndDisabled = currentIndex >= featuredArticle.length - itemsPerPage;

  return (
    <div className="pb-12">
      <div className="container h-3/4 mx-auto px-20 pt-20">
        <div className="relative h-5/6">
          <div className="overflow-hidden">
            <div
				id="carousel_o"
              className="flex w-full  transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              }}
            >
              {featuredArticle?.map((article) => (
                // <div 
                //   key={article._id}
                //   className="w-full h-full flex-shrink-0 px-2"
                // >
                //   <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden h-full transition-all duration-300 hover:shadow-xl border border-purple-500/30">
                //     <div id="carousel_img" className="overflow-hidden ">
                //       <img
                //         src={article.image}
                //         alt={article.title}
                //         className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                //       />
                //     </div>
                //     <div id="Text_l" className="p-4">
                //       <h3 className="text-lg font-semibold mb-2 text-purple-950">
                //         {article.title}
                //       </h3>
                //     </div>
                //   </div>
                // </div>
                <SpiltArticles key={article._id} article={article} />
              ))}
            </div>
          </div>
          <button
            onClick={prevSlide}
            disabled={isStartDisabled}
			id="Prev_R"
            className={`absolute top-1/2 -left-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${
              isStartDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-500"
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isEndDisabled}
			id="Next_L"
            className={`absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${
              isEndDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-500"
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default FeaturedArticle;
