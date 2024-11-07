import "../../public/css/about.css";

const About = () => {

  return (
    <div>
      <div className="about-bg pt-20">
        <div className="about-text">
          <span></span>
        </div>
      </div>
      <div 
      style={{display:"none"}}
      className="about-members">
        <div
        onClick={() => { const TogInt = document.querySelector(".tog-intr");
            TogInt.classList.toggle("active");
        }}
        className="about-card cursor-pointer">
          <div className="rot-media"></div>
          <div className="rot-media"></div>
          <div className="rot-media"></div>
          <div className="rot-media"></div>
          <div className="about-card-img">
            <img src="./8-bit-graphics-pixels-scene-with-pyramids.jpg" alt="" />
          </div>
          <div className="about-card-text">
            <h1>Eng.Loay Ashraf</h1>
            <div className="tog-intr">
              <div className="introduce"></div>
            </div>
          </div>
        </div>
        <div 
         onClick={() => { const TogInt1 = document.querySelector(".tog-intr1");
          TogInt1.classList.toggle("active");
      }}
        className="about-card cursor-pointer">
          <div className="rot-media"></div>
          <div className="rot-media"></div>
          <div className="rot-media"></div>
          <div className="rot-media"></div>
          <div className="about-card-img">
            <img src="./8-bit-graphics-pixels-scene-with-pyramids.jpg" alt="" />
          </div>
          <div className="about-card-text">
            <h1>Eng.Omar Hassan</h1>
            <div className="tog-intr1">
              <div className="introduce"></div>
            </div>
          </div>
        </div>
        <div
         onClick={() => { const TogInt2 = document.querySelector(".tog-intr2");
          TogInt2.classList.toggle("active");
      }}
        className="about-card cursor-pointer">
          <div className="rot-media"></div>
          <div className="rot-media"></div>
          <div className="rot-media"></div>
          <div className="rot-media"></div>
          <div className="about-card-img">
            <img src="./8-bit-graphics-pixels-scene-with-pyramids.jpg" alt="" />
          </div>
          <div className="about-card-text">
            <h1>Eng.Emy wagde</h1>
            <div className="tog-intr2">
              <div className="introduce"></div>
            </div>
          </div>
        </div>
        <div
         onClick={() => { const TogInt3 = document.querySelector(".tog-intr3");
          TogInt3.classList.toggle("active");
      }}
        className="about-card cursor-pointer">
          <div className="rot-media"></div>
          <div className="rot-media"></div>
          <div className="rot-media"></div>
          <div className="rot-media"></div>
          <div className="about-card-img">
            <img src="./8-bit-graphics-pixels-scene-with-pyramids.jpg" alt="" />
          </div>
          <div className="about-card-text">
            <h1>Eng.Mohamed</h1>
            <div className="tog-intr3">
              <div className="introduce"></div>
            </div>
          </div>
        </div>
        <div 
         onClick={() => { const TogInt4 = document.querySelector(".tog-intr4");
          TogInt4.classList.toggle("active");
      }}
        className="about-card cursor-pointer">
          <div className="rot-media"></div>
          <div className="rot-media"></div>
          <div className="rot-media"></div>
          <div className="rot-media"></div>
          <div className="about-card-img">
            <img src="./8-bit-graphics-pixels-scene-with-pyramids.jpg" alt="" />
          </div>
          <div className="about-card-text">
            <h1>Eng.Laila Adam</h1>
            <div className="tog-intr4">
              <div className="introduce"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
