import { useState, useEffect } from "react";
import { ChevronsUpIcon } from "lucide-react";


function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight/3 ) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {showButton && (
        <button
          onClick={scrollToTop}
          style={{ position: "fixed", bottom: "20px", right: "20px", zIndex:20 , borderRadius:"50%",border:"3px double white",background:"#A459EE",transition:"0.3s ease-in-out"}}
          className=' hover:text-purple-300 '
        >
         <ChevronsUpIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

export default ScrollToTopButton;
