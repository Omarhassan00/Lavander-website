import { useEffect } from "react";
import { useArticleStore } from "../stores/useArticleStore";
import FeaturedArticle from "../components/FeaturedArticle";
import "../../public/css/bloggar.css";
import "../../public/css/Home.css";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { fetchFeaturedArticles, Articles, isLoading } = useArticleStore();

  useEffect(() => {
    fetchFeaturedArticles();
  }, [fetchFeaturedArticles]);
  // console.log(Articles)
  return (
    <div
    onClick = { () => {
      Navbar.menuBtn
    }}
    >
              {!isLoading && Articles.length > 0 && (
          <FeaturedArticle featuredArticle={Articles} />
        )}
        
      <div className="media-icon">
      <Link to="https://www.facebook.com/maidarawe?mibextid=ZbWKwL"></Link>
          <Link to="https://www.instagram.com/lavendermarketing634?igsh=YzAwZjE1ZTI0Zg=="></Link>
          <Link to="https://www.tiktok.com/@lavanderlifeexporting?_t=8piAmaKUfNB&_r=1"></Link>
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
              <Link to="/Lavant/Male">
                  <img src="../../public/img/icons8-man-100.png" alt="man" />
                </Link>
              </li>
              <li className="--i:0.2s">
              <Link to="/Lavant/Female">
                  <img
                    src="../../public/img/icons8-businesswoman-100 (1).png"
                    alt="Woman"
                  />
                </Link>
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
              <Link to="/Lavand/Male">
                  <img src="../../public/img/icons8-man-100.png" alt="man" />
                </Link>
              </li>
              <li className="--i:0.2s">
              <Link to="/Lavand/Female">
                  <img
                    src="../../public/img/icons8-businesswoman-100 (1).png"
                    alt=""
                  />
                </Link>
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
              backgroundImage: `url('../../public/img/v4QYHc8WS3Ku7YTfX3kBXQ.png')`,
            }}
          ></div>
          <div
            className="img img2"
            style={{
              backgroundImage: `url('../../public/img/the-process-of-manufacturing-leather-in-shoes-sAy2lp-9SnKWdkdVORmi_w-HDJiD1b7SxSgdBrXZsLu7A.jpeg')`,
            }}
          ></div>
          <div
            className="img img3"
            style={{
              backgroundImage: `url('../../public/img/bVla81QrRa-PYIQF68oyeg.png')`,
            }}
          ></div>
          <div
            className="img img4"
            style={{
              backgroundImage: `url('../../public/img/0f9w-awdTQCaFSppdUe4wg.png')`,
            }}
          ></div>
          <div
            className="img img5"
            style={{
              backgroundImage: `url('../../public/img/frfNzcf5Tt2RH334kuy1Mg.png')`,
            }}
          ></div>
          {/* <div
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
          ></div> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
