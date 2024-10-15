import "../../public/css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* <div className="footer-col">
                    <h4>Career</h4>
                    <ul>
                        <li><a href="#">about us</a></li>
                        <li><a href="#">our services</a></li>
                        <li><a href="#">privacy policy</a></li>
                        <li><a href="#">affiliate program</a></li>
                    </ul>
                </div> */}
          <div className="footer-col">
            <h4>company</h4>
            <ul>
              <li>
                <a href="/">Home Page</a>
              </li>
              <li>
                <a href="/Plogs">Articals</a>
              </li>
              <li>
                <a href="/product_page">Product</a>
              </li>
              <li>
                <a href="/About">About Us</a>
              </li>
              <li>
                <a href="/ContactUs">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Carrer</h4>
            <ul>
              <li>
                <a href="#">Recrutments</a>
              </li>
              <li>
                <a href="#">Training</a>
              </li>
              <li>
                <a href="#">Internship</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>online shop</h4>
            <ul>
              <li>
                <a href="/category/Lavant">LAVANT</a>
              </li>
              <li>
                <a href="/category/Lavand">LAVAND</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>follow us</h4>
            <div className="social-links">
              <a href="https://www.facebook.com/maidarawe?mibextid=ZbWKwL">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.linkedin.com/in/lavender-life-exporting-3145852b4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://www.instagram.com/lavendermarketing634?igsh=YzAwZjE1ZTI0Zg==">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.tiktok.com/@lavanderlifeexporting?_t=8piAmaKUfNB&_r=1">
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
