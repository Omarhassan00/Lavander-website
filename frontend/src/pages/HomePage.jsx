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
                  <img src="https://res.cloudinary.com/ds7lqwxbp/image/upload/v1729211626/static/xoflaktvqpecadmmwife.png" 
                    alt="man" 
                  />
                </Link>
              </li>
              <li className="--i:0.2s">
              <Link to="/Lavant/Female">
                  <img
                    src="https://res.cloudinary.com/ds7lqwxbp/image/upload/v1729211626/static/gg6dbt6tylw6js8vezhu.png"
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
                  <img src="https://res.cloudinary.com/ds7lqwxbp/image/upload/v1729211626/static/xoflaktvqpecadmmwife.png" alt="man" />
                </Link>
              </li>
              <li className="--i:0.2s">
              <Link to="/Lavand/Female">
                  <img
                    src="https://res.cloudinary.com/ds7lqwxbp/image/upload/v1729211626/static/gg6dbt6tylw6js8vezhu.png"
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
              backgroundImage: `url('https://res.cloudinary.com/ds7lqwxbp/image/upload/v1729222541/static/smk86a9m7ubyu66k7uzt.png')`,
            }}
          ></div>
          <div
            className="img img2"
            style={{
              backgroundImage: "url('https://res.cloudinary.com/ds7lqwxbp/image/upload/v1729222538/static/koxeclafqaomhde4odmr.jpg')",
            }}
          ></div>
          <div
            className="img img3"
            style={{
              backgroundImage: "url('https://res.cloudinary.com/ds7lqwxbp/image/upload/v1729222540/static/eq86zt5rklwlyaqxlkjw.png')",
            }}
          ></div>
          <div
            className="img img4"
            style={{
              backgroundImage: "url('https://res.cloudinary.com/ds7lqwxbp/image/upload/v1729222539/static/wojwaa4fomizftgaazoq.png')",
            }}
          ></div>
          <div
            className="img img5"
            style={{
              backgroundImage: "url('https://res.cloudinary.com/ds7lqwxbp/image/upload/v1729222539/static/qxxayhgluwstqp3z5ore.png')",
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
