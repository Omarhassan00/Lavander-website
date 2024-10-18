import "../../public/css/Contact-Us.css";
import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import { Loader, Send } from "lucide-react";
import { Link } from "react-router-dom";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    message: "",
  });

  const { contactUs, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    contactUs(formData);
  };
  return (
    <section className="container-contact-big pt-28">
      <div className="content">
        <h2>Contact-Us</h2>
        <p>
          Welcome to our Contact Page! We’d love to hear from you. Whether you
          have feedback about our recipes, questions, or special requests, feel
          free to reach out. Your input helps us improve and create even better
          content for you. Don’t hesitate to get in touch!
        </p>
      </div>
      <div className="container-contact">
        <div className="contactInfo">
          <div className="box">
            <div className="icon-contact">
              <b></b>
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <div className="text-contact">
              <h3>Address</h3>
              <p>
                Shorouk City 2 ,<br /> Third District, 
                <br /> East Villa, 
                <br />
                Villa 3,
                <br /> next to Patio 5
              </p>
            </div>
          </div>
          <div className="box">
            <div className="icon-contact">
              <b></b>
              <i className="fa-solid fa-phone"></i>
            </div>
            <div className="text-contact">
              <h3>Phone</h3>
              <p>+20 10 07828287</p>
            </div>
          </div>
          <div className="box">
            <div className="icon-contact">
              <b></b>
              <i className="fa-solid fa-envelope"></i>
            </div>
            <div className="text-contact">
              <h3>Email</h3>
              <p>LavanderLife@gmail.com</p>
            </div>
          </div>

          <h2 className="txt">Connect With Us</h2>
          <ul className="sci">
            <li>
              <Link to={"https://www.facebook.com/maidarawe?mibextid=ZbWKwL"}>
                <i className="fa-brands fa-facebook-f"></i>
              </Link>
            </li>
            <li>
              <Link to={"https://www.tiktok.com/@lavanderlifeexporting?_t=8piAmaKUfNB&_r=1"}>
                <i className="fa-brands fa-tiktok"></i>
              </Link>
            </li>
            <li>
              <Link to={"https://www.instagram.com/lavendermarketing634?igsh=YzAwZjE1ZTI0Zg=="}>
                <i className="fa-brands fa-instagram"></i>
              </Link>
            </li>
            <li>
              <Link to={"https://www.linkedin.com/in/lavender-life-exporting-3145852b4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"}>
                <i className="fa-brands fa-linkedin-in"></i>
              </Link>
            </li>
          </ul>
        </div>
        <div className="contactForm">
          <form onSubmit={handleSubmit}>
            <h2>Send Message</h2>
            <div className="inputBox">
              <input
                id="fullname"
                type="text"
                required
                value={formData.fullname}
                onChange={(e) =>
                  setFormData({ ...formData, fullname: e.target.value })
                }
              />
              <span>Fall Name</span>
            </div>
            <div className="inputBox">
              <input
                id="email"
                type="email"
                name="email"
                required="required"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <span>Email</span>
            </div>
            <div className="inputBox">
              <textarea
                id="message"
                name="message"
                required="required"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              ></textarea>
              <span>Enter Your Message...</span>
            </div>
            <div className="inputBox">
              <button
                type="submit"
                value="Send"
                className="w-full flex justify-center py-2 px-4 border border-transparent 
							rounded-md shadow-sm text-sm font-medium text-white bg-purple-600
							 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-purple-500 transition duration-150 ease-in-out disabled:opacity-50"
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
                    <Send className="mr-2 h-5 w-5" aria-hidden="true" />
                    Send
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
