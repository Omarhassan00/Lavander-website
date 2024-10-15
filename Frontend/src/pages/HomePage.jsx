import { useEffect } from "react";
import { useArticleStore } from "../stores/useArticleStore";
import FeaturedArticle from "../components/FeaturedArticle";
// import { motion } from "framer-motion";
import "../../public/css/bloggar.css";
import "../../public/css/Home.css";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const { fetchFeaturedArticles, Articles, isLoading } = useArticleStore();

  useEffect(() => {
    fetchFeaturedArticles();
  }, [fetchFeaturedArticles]);
  console.log(Articles)
  return (
    <div
    onClick = { () => {
      Navbar.menuBtn
    }}
    >
      {/* <section 
      onClick={() => {
        const btns = document.querySelectorAll(".nav-btn");
        const slides = document.querySelectorAll(".video-slide");
        const contents = document.querySelectorAll(".content");
    
        var sliderNav = function (manual) {
          btns.forEach((btn) => {
            btn.classList.remove("active");
          });
          slides.forEach((slide) => {
            slide.classList.remove("active");
          });
          contents.forEach((content) => {
            content.classList.remove("active");
          });
    
          btns[manual].classList.add("active");
          slides[manual].classList.add("active");
          contents[manual].classList.add("active");
        };
        btns.forEach((btn, i) => {
          btn.addEventListener("click", () => {
            sliderNav(i);
          });
        });
      }}
      className="home">
        <video
          className="video-slide active"
          src="../../public/img/lavander ex.mp4"
          autoPlay
          muted
          loop
        ></video>
        <div className="content active">
          <h1>
            Wonderful.
            <br />
            <span>Lavander</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque
            pariatur, velit harum sed ad vero aperiam suscipit commodi
            voluptates maxime.
          </p>
          <a href="">Read More</a>
        </div>
        
        <div className="slider-big-nav">
          <div className="nav-btn active"></div>
        </div>
      </section> */}
     
      
              {!isLoading && Articles.length > 0 && (
          <FeaturedArticle featuredArticle={Articles} />
        )}
        
      <div className="media-icon">
      <a href="https://www.facebook.com/maidarawe?mibextid=ZbWKwL"></a>
          <a href="https://www.instagram.com/lavendermarketing634?igsh=YzAwZjE1ZTI0Zg=="></a>
          <a href="https://www.tiktok.com/@lavanderlifeexporting?_t=8piAmaKUfNB&_r=1"></a>
        </div>
      <div className="brand-nav">
        <div className="navigation-brand">
          <div
            onClick={() => {
              let menuToggle = document.querySelector(".menuToggle");
              menuToggle.classList.toggle("active");
            }}
            className="menuToggle"
          ></div>
          <div className="menu">
            <ul>
              <li className="--i:0.1s">
              <a href="/Lavant/Male">
                  <img src="../../public/img/icons8-man-100.png" alt="man" />
                </a>
              </li>
              <li className="--i:0.2s">
              <a href="/Lavant/Female">
                  <img
                    src="../../public/img/icons8-businesswoman-100 (1).png"
                    alt="Woman"
                  />
                </a>
              </li>
            </ul>
          </div>
          <div className="navigation-text">
            {/* <h1>Lavander</h1>
            <br />
            <br /> */}
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
          </div>
        </div>
        <div className="navigation-brand1">
          <div
            onClick={() => {
              let menuToggle1 = document.querySelector(".menuToggle1");
              menuToggle1.classList.toggle("active");
            }}
            className="menuToggle1"
          ></div>
          <div className="menu1">
            <ul>
              <li className="--i:0.1s">
              <a href="/Lavand/Male">
                  <img src="../../public/img/icons8-man-100.png" alt="man" />
                </a>
              </li>
              <li className="--i:0.2s">
              <a href="/Lavand/Female">
                  <img
                    src="../../public/img/icons8-businesswoman-100 (1).png"
                    alt=""
                  />
                </a>
              </li>
            </ul>
          </div>
          <div className="navigation-text1">
            {/* <h1>Lavander</h1>
            <br />
            <br /> */}
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div
          onClick={(event) => {
            const clickedElement = event.target,
              imgs = document.querySelectorAll(".img");

            if (!clickedElement.classList.contains("img")) {
              imgs.forEach((img) => img.classList.remove("active"));
              return;
            }
            if (clickedElement.classList.contains("active")) {
              clickedElement.classList.remove("active");
              return;
            }
            imgs.forEach((img) => img.classList.remove("active"));
            clickedElement.classList.add("active");
          }}
          className="imgs-parent"
        >
          <div
            className="img img1"
            style={{
              backgroundImage: `url('../../public/img/view-3d-businessman.jpg')`,
            }}
          ></div>
          <div
            className="img img2"
            style={{
              backgroundImage: `url('../../public/img/backschool.jpg')`,
            }}
          ></div>
          <div
            className="img img3"
            style={{
              backgroundImage: `url('../../public/img/view-3d-school-girl.jpg')`,
            }}
          ></div>
          <div
            className="img img4"
            style={{
              backgroundImage: `url('../../public/img/view-3d-man-dish-washing.jpg')`,
            }}
          ></div>
          <div
            className="img img5"
            style={{
              backgroundImage: `url('../../public/img/3d-cartoon-back-school.jpg')`,
            }}
          ></div>
          <div
            className="img img6"
            style={{
              backgroundImage: `url('../../public/img/view-3d-businessman_23-2150709872.jpg')`,
            }}
          ></div>
          <div
            className="img img7"
            style={{
              backgroundImage: `url('../../public/img/view-3d-girl-with-open-book.jpg')`,
            }}
          ></div>
          <div
            className="img img8"
            style={{
              backgroundImage: `url('../../public/img/view-3d-shocked-man-with-mouth-wide-open.jpg')`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
