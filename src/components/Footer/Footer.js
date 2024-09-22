import "./Footer.scss";
import footer1 from "../../assets/images/footer-1.png";
import icon1 from "../../assets/icons/icon-1.svg";
import icon2 from "../../assets/icons/icon-2.svg";
import icon3 from "../../assets/icons/icon-3.svg";
import icon4 from "../../assets/icons/icon-4.svg";
import icon5 from "../../assets/icons/icon-5.svg";
import icon6 from "../../assets/icons/icon-address.svg";
import icon7 from "../../assets/icons/icon-contact.svg";
import icon8 from "../../assets/icons/icon-email-2.svg";
import icon9 from "../../assets/icons/icon-clock.svg";
import icon10 from "../../assets/icons/icon-6.svg";
import icon11 from "../../assets/icons/icon-facebook-white.svg";
import icon12 from "../../assets/icons/icon-twitter-white.svg";
import icon13 from "../../assets/icons/icon-instagram-white.svg";
import icon14 from "../../assets/icons/icon-pinterest-white.svg";
import icon15 from "../../assets/icons/icon-youtube-white.svg";

import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import appStore from "../../assets/images/app-store.jpg";
import ggPlay from "../../assets/images/google-play.jpg";
import payment from "../../assets/images/payment-method.png";
import phoneCall from "../../assets/icons/phone-call.svg";

const Footer = () => {
  return (
    <footer className="main">
      <section className="newsletter mb-15">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="position-relative newsletter-inner">
                <div className="newsletter-content">
                  <h2 className="mb-20 text-title">
                    Stay home &amp; get your daily <br />
                    needs from our shop
                  </h2>
                  <p className="mb-45 text-p">
                    Start You'r Daily Shopping with{" "}
                    <span className="text-brand">Nest Mart</span>
                  </p>
                </div>
                <img src={footer1} alt="newsletter" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="featured  section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-1-5 col-md-4 col-12 col-6 mb-md-4 mb-xl-0">
              <div
                className="banner-left-icon d-flex align-items-center  wow animate__animated animate__fadeInUp mb-15"
                data-wow-delay="0"
              >
                <div className="banner-icon">
                  <img src={icon1} alt="" />
                </div>
                <div className="banner-text">
                  <h3 className="icon-box-title">Best prices &amp; offers</h3>
                  <p>Orders $50 or more</p>
                </div>
              </div>
            </div>
            <div className="col-lg-1-5 col-md-4 col-12 col-6 mb-md-4 mb-xl-0">
              <div
                className="banner-left-icon d-flex align-items-center  wow animate__animated animate__fadeInUp mb-15"
                data-wow-delay="0"
              >
                <div className="banner-icon">
                  <img src={icon2} alt="" />
                </div>
                <div className="banner-text">
                  <h3 className="icon-box-title">Free delivery</h3>
                  <p>24/7 amazing services</p>
                </div>
              </div>
            </div>
            <div className="col-lg-1-5 col-md-4 col-12 col-6 mb-md-4 mb-xl-0">
              <div
                className="banner-left-icon d-flex align-items-center  wow animate__animated animate__fadeInUp mb-15"
                data-wow-delay="0"
              >
                <div className="banner-icon">
                  <img src={icon3} alt="" />
                </div>
                <div className="banner-text">
                  <h3 className="icon-box-title">Great daily deal</h3>
                  <p>When you sign up</p>
                </div>
              </div>
            </div>
            <div className="col-lg-1-5 col-md-4 col-12 col-6 mb-md-4 mb-xl-0">
              <div
                className="banner-left-icon d-flex align-items-center  wow animate__animated animate__fadeInUp mb-15"
                data-wow-delay="0"
              >
                <div className="banner-icon">
                  <img src={icon4} alt="" />
                </div>
                <div className="banner-text">
                  <h3 className="icon-box-title">Wide assortment</h3>
                  <p>Mega Discounts</p>
                </div>
              </div>
            </div>
            <div className="col-lg-1-5 col-md-4 col-12 col-6 mb-md-4 mb-xl-0">
              <div
                className="banner-left-icon d-flex align-items-center  wow animate__animated animate__fadeInUp mb-15"
                data-wow-delay="0"
              >
                <div className="banner-icon">
                  <img src={icon5} alt="" />
                </div>
                <div className="banner-text">
                  <h3 className="icon-box-title">Easy returns</h3>
                  <p>Within 30 days</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-md-block d-lg-none">
              <div
                className="banner-left-icon d-flex align-items-center  wow animate__animated animate__fadeInUp mb-15"
                data-wow-delay="0"
              >
                <div className="banner-icon">
                  <img src={icon10} alt="" />
                </div>
                <div className="banner-text">
                  <h3 className="icon-box-title">Safe delivery</h3>
                  <p>Within 30 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-padding footer-mid">
        <div className="container pt-15 pb-20">
          <div className="row">
            <div className="col me-lg-5">
              <div className="widget-about font-md mb-md-3 mb-lg-3 mb-xl-0">
                <div className="mb-30">
                  <Link to="/">
                    <img
                      src={Logo}
                      alt="logo"
                      width="200"
                      height="80"
                      className="mb-15"
                    />
                  </Link>
                  <p className="font-lg text-heading">
                    Awesome grocery store website template
                  </p>
                </div>
                <ul className="contact-infor">
                  <li>
                    <img src={icon7} alt="" />
                    <strong className="d-none d-lg-block">Call Us:</strong>
                    <a href="tel:0387779614"> 0387779614</a>
                  </li>
                  <li>
                    <img src={icon8} alt="" />
                    <strong className="d-none d-lg-block">Email:</strong>
                    <a href="mailto: binnlw03@gmail.com"> binnlw03@gmail.com</a>
                  </li>
                  <li>
                    <img src={icon9} alt="" />
                    <strong className="d-none d-lg-block">Hours:</strong>
                    <span>10:00 - 18:00, Mon - Sat</span>
                  </li>
                  <li>
                    <img src={icon6} alt="" />
                    <strong className="d-none d-lg-block">Address: </strong>
                    <span>
                      Linh Trung, Thu Duc City, Ho Chi Minh City, Vietnam
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col footer-link-widget">
              <h4 className="widget-title">Company</h4>
              <ul className="footer-list mb-md-0 mb-5 ">
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Delivery Information</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms &amp; Conditions</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Support Center</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
              </ul>
            </div>
            <div className="footer-link-widget col  " data-wow-delay=".4s">
              <h4 className="widget-title ">Popular</h4>
              <ul className="footer-list  mb-sm-5 mb-md-0">
                <li>
                  <a href="#">Milk &amp; Flavoured Milk</a>
                </li>
                <li>
                  <a href="#">Butter and Margarine</a>
                </li>
                <li>
                  <a href="#">Eggs Substitutes</a>
                </li>
                <li>
                  <a href="#">Marmalades</a>
                </li>
                <li>
                  <a href="#">Sour Cream and Dips</a>
                </li>
                <li>
                  <a href="#">Tea &amp; Kombucha</a>
                </li>
                <li>
                  <a href="#">Cheese</a>
                </li>
              </ul>
            </div>
            <div
              className="footer-link-widget widget-install-app col  wow animate__animated animate__fadeInUp"
              data-wow-delay=".5s"
            >
              <h4 className="widget-title ">Install App</h4>
              <p className="">From App Store or Google Play</p>
              <div className="download-app mt-25 mb-lg-30 mb-15 ">
                <a href="#" className="hover-up mb-2 mb-lg-0">
                  <img
                    className="active"
                    src={appStore}
                    alt=""
                    style={{ maxWidth: "128px" }}
                  />
                </a>
                <a href="#" className="hover-up mb-2">
                  <img src={ggPlay} alt="" style={{ maxWidth: "128px" }} />
                </a>
              </div>
              <p className="mb-20">Secured Payment Gateways</p>
              <img src={payment} alt="" />
            </div>
          </div>
        </div>
      </section>
      <div className="container pb-30">
        <div className="row align-items-center">
          <div className="col-12 mb-30">
            <div className="footer-bottom"></div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6">
            <p className="text-p2 mb-0">
              © 2024, <strong className="text-brand">Nest</strong> - HTML
              Ecommerce Template <br />
              All rights reserved
            </p>
          </div>
          <div className="col-xl-4 col-lg-6 text-center d-none d-xl-block">
            <div className="d-lg-inline-flex hotline mr-30">
              <img src={phoneCall} alt="hotline" style={{ maxWidth: "30px" }} />
              <p>
                1900 - 6666<span>Working 8:00 - 22:00</span>
              </p>
            </div>
            <div className="d-lg-inline-flex hotline mr-30">
              <img src={phoneCall} alt="hotline" style={{ maxWidth: "30px" }} />
              <p>
                1900 - 8888<span>24/7 Support Center</span>
              </p>
            </div>
          </div>

          <div className="col-xl-4 col-lg-6 col-md-6 text-end d-none d-md-block">
            <div className="mobile-social-icon">
              <h6>Follow Us</h6>
              <a href="#">
                <img src={icon11} alt="" style={{ maxWidth: "20px" }} />
              </a>
              <a href="#">
                <img src={icon12} alt="" style={{ maxWidth: "20px" }} />
              </a>
              <a href="#">
                <img src={icon13} alt="" style={{ maxWidth: "20px" }} />
              </a>
              <a href="#">
                <img src={icon14} alt="" style={{ maxWidth: "20px" }} />
              </a>
              <a href="#">
                <img src={icon15} alt="" style={{ maxWidth: "20px" }} />
              </a>
            </div>
            <p className="text-p2">
              Up to 15% discount on your first subscribe
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
