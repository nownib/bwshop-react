import "./About.scss";
import about1 from "../../assets/images/about-1.png";
import about2 from "../../assets/images/about-2.png";
import about3 from "../../assets/images/about-3.png";
import about4 from "../../assets/images/about-4.png";
import about5 from "../../assets/images/about-5.png";
import about6 from "../../assets/images/about-6.png";
import about7 from "../../assets/images/about-7.png";
import icon1 from "../../assets/icons/icon-1.svg";
import icon2 from "../../assets/icons/icon-2.svg";
import icon3 from "../../assets/icons/icon-3.svg";
import icon4 from "../../assets/icons/icon-4.svg";
import icon5 from "../../assets/icons/icon-5.svg";
import icon6 from "../../assets/icons/icon-6.svg";
import icon7 from "../../assets/icons/icon-facebook-brand.svg";
import icon8 from "../../assets/icons/icon-instagram-brand.svg";
import icon9 from "../../assets/icons/icon-twitter-brand.svg";
import icon10 from "../../assets/icons/icon-youtube-brand.svg";

const About = (props) => {
  return (
    <div className="about-content pt-50">
      <div className="container">
        <div className="row">
          <div className="col-xl-10 col-lg-12 m-auto">
            <section className="row align-items-center mb-50">
              <div className="col-lg-6">
                <img
                  style={{ maxWidth: "100%", borderRadius: "15px" }}
                  src={about1}
                  alt=""
                  className=" mb-lg-0 mb-4"
                />
              </div>
              <div className="col-lg-6">
                <div className="introduce ps-0 ps-md-4">
                  <h2 className="mb-30">Welcome to BW Shop</h2>
                  <p className="mb-25">
                    At BW Shop, we take snacking to the next level. As a leading
                    provider of premium snacks, we’re dedicated to offering
                    delicious and high-quality treats that cater to every taste.
                    Our extensive selection ranges from classic favorites to
                    unique and exotic flavors, all made with the finest
                    ingredients.
                  </p>
                  <p className="mb-50">
                    We believe snacking should be a delightful experience, which
                    is why we constantly innovate and expand our product line.
                    Our commitment to quality ensures that every snack is
                    crafted to perfection. From savory bites to sweet treats, BW
                    SHOP has it all. Whether you're looking for a quick
                    pick-me-up or something special for a celebration, we have
                    the perfect snack for every occasion. Join us in our mission
                    to make the world a tastier place, one snack at a time!
                  </p>
                  <div className="carausel">
                    <div id="carausel-arrows">
                      <span className="slider-btn slider-prev slick-arrow">
                        <i className="fa fa-arrow-right" aria-hidden="true"></i>
                      </span>
                    </div>
                    <div className="slick-slider" id="slick-slider">
                      <div className="slick-list">
                        <div className="strick-track">
                          <img
                            src={about2}
                            alt=""
                            style={{ maxWidth: "128px" }}
                          />
                          <img
                            src={about3}
                            alt=""
                            style={{ maxWidth: "128px" }}
                          />
                          <img
                            src={about4}
                            alt=""
                            style={{ maxWidth: "128px" }}
                            className="d-none d-md-block"
                          />
                          <img
                            src={about3}
                            alt=""
                            style={{ maxWidth: "128px" }}
                            className="d-none d-md-block"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="text-center mb-50">
              <h2 className="title mb-40">What We Provide?</h2>
              <div className="row">
                <div className="col-lg-4 col-md-6 mb-24">
                  <div className="featured-card">
                    <img src={icon1} />
                    <h4>Best Prices & Offers</h4>
                    <p>
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form
                    </p>
                    <a href="#">Read more</a>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-24">
                  <div className="featured-card">
                    <img src={icon2} />
                    <h4>Wide Assortment</h4>
                    <p>
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form
                    </p>
                    <a href="#">Read more</a>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-24">
                  <div className="featured-card">
                    <img src={icon3} />
                    <h4>Free Delivery</h4>
                    <p>
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form
                    </p>
                    <a href="#">Read more</a>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-24">
                  <div className="featured-card">
                    <img src={icon4} />
                    <h4>Easy Returns</h4>
                    <p>
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form
                    </p>
                    <a href="#">Read more</a>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-24">
                  <div className="featured-card">
                    <img src={icon5} />
                    <h4>100% Satisfaction</h4>
                    <p>
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form
                    </p>
                    <a href="#">Read more</a>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-24">
                  <div className="featured-card">
                    <img src={icon6} />
                    <h4>Great Daily Deal</h4>
                    <p>
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form
                    </p>
                    <a href="#">Read more</a>
                  </div>
                </div>
              </div>
            </section>
            <section className="row align-items-center mb-50">
              <div className="row mb-50 align-items-center">
                <div className="col-lg-7 pr-30">
                  <img
                    src={about5}
                    style={{ maxWidth: "100%" }}
                    className="mb-md-3 mb-lg-0 mb-sm-4"
                  />
                </div>
                <div className="col-lg-5">
                  <h4 className="mb-20 text-muted">Our performance</h4>
                  <h1 className="heading-1 mb-40">
                    Your Partner for e-commerce grocery solution
                  </h1>
                  <p className="mb-30 text-p">
                    Ed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto
                  </p>
                  <p className="text-p">
                    Pitatis et quasi architecto beatae vitae dicta sunt
                    explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                    aspernatur aut odit aut fugit, sed quia
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4 pr-30 mb-md-5 mb-lg-0 mb-sm-5">
                  <h3 className="mb-30 text-title">Who we are</h3>
                  <p className="text-p">
                    Volutpat diam ut venenatis tellus in metus. Nec dui nunc
                    mattis enim ut tellus eros donec ac odio orci ultrices in.
                    ellus eros donec ac odio orci ultrices in.
                  </p>
                </div>{" "}
                <div className="col-lg-4 pr-30 mb-md-5 mb-lg-0 mb-sm-5">
                  <h3 className="mb-30 text-title">Our history</h3>
                  <p className="text-p">
                    Volutpat diam ut venenatis tellus in metus. Nec dui nunc
                    mattis enim ut tellus eros donec ac odio orci ultrices in.
                    ellus eros donec ac odio orci ultrices in.
                  </p>
                </div>
                <div className="col-lg-4 pr-30 mb-md-5 mb-lg-0 mb-sm-5">
                  <h3 className="mb-30 text-title">Our mission</h3>
                  <p className="text-p">
                    Volutpat diam ut venenatis tellus in metus. Nec dui nunc
                    mattis enim ut tellus eros donec ac odio orci ultrices in.
                    ellus eros donec ac odio orci ultrices in.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="container mb-50 d-none d-md-block">
        <div className="row about-count">
          <div className="col-lg-1-5 col-md-6 text-center mb-lg-0 mb-md-5">
            <h1 className="heading-3">
              <span className="count">12</span>+
            </h1>
            <h4 className="heading-2">Glorious years</h4>
          </div>
          <div className="col-lg-1-5 col-md-6 text-center">
            <h1 className="heading-3">
              <span className="count">36</span>+
            </h1>
            <h4 className="heading-2">Happy clients</h4>
          </div>
          <div className="col-lg-1-5 col-md-6 text-center">
            <h1 className="heading-3">
              <span className="count">58</span>+
            </h1>
            <h4 className="heading-2">Projects complete</h4>
          </div>
          <div className="col-lg-1-5 col-md-6 text-center">
            <h1 className="heading-3">
              <span className="count">24</span>+
            </h1>
            <h4 className="heading-2">Team advisor</h4>
          </div>
          <div className="col-lg-1-5 text-center d-none d-lg-block">
            <h1 className="heading-3">
              <span className="count">26</span>+
            </h1>
            <h4 className="heading-2">Products Sale</h4>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xl-10 col-lg-12 m-auto">
            <section className="mb-50">
              <h2 className="title mb-40 text-center">Our Team</h2>
              <div className="row">
                <div className="col-lg-4 mb-lg-0 mb-md-5 mb-40">
                  <h6 className=" text-brand">Our Team</h6>
                  <h1 className="mb-30 heading-1">Meet Our Expert Team</h1>
                  <p className="mb-30">
                    Proin ullamcorper pretium orci. Donec necscele risque leo.
                    Nam massa dolor imperdiet neccon sequata congue idsem.
                    Maecenas malesuada faucibus finibus.
                  </p>
                  <p className="mb-30">
                    Proin ullamcorper pretium orci. Donec necscele risque leo.
                    Nam massa dolor imperdiet neccon sequata congue idsem.
                    Maecenas malesuada faucibus finibus.
                  </p>
                  <a href="#" className="btn btn-view-member">
                    View All Members
                  </a>
                </div>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="team-card">
                        <img
                          style={{ maxWidth: "100%", borderRadius: "15px" }}
                          src={about6}
                          alt=""
                          className=" mb-lg-0"
                        />
                        <div className="content text-center">
                          <h4 className=" text-title">H. Merinda</h4>
                          <span className="text-p">CEO &amp; Co-Founder</span>
                          <div className="social-network mt-20">
                            <a href="#">
                              <img src={icon7} alt="" />
                            </a>
                            <a href="#">
                              <img src={icon9} alt="" />
                            </a>
                            <a href="#">
                              <img src={icon8} alt="" />
                            </a>

                            <a href="#">
                              <img src={icon10} alt="" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="team-card">
                        <img
                          style={{ maxWidth: "100%", borderRadius: "15px" }}
                          src={about7}
                          alt=""
                          className="mb-lg-0"
                        />
                        <div className="content text-center ">
                          <h4 className=" text-title">Dilan Specter</h4>
                          <span className="text-p">Head Engineer</span>
                          <div className="social-network mt-20">
                            <a href="#">
                              <img src={icon7} alt="" />
                            </a>
                            <a href="#">
                              <img src={icon9} alt="" />
                            </a>
                            <a href="#">
                              <img src={icon8} alt="" />
                            </a>

                            <a href="#">
                              <img src={icon10} alt="" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
