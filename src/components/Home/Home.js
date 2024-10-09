import "./Home.scss";
import slide1 from "../../assets/images/slider-5.png";
import slide2 from "../../assets/images/banner-11-6ac13eb4.png";
import slide3 from "../../assets/images/slider-6.png";
import { useEffect, useState } from "react";
import { fetchAllProductTrending } from "../../services/productService";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Audio } from "react-loader-spinner";
import {
  fetchProductDetailsRedux,
  addProductToWishlistRedux,
} from "../../redux/action/actions";
import { toast } from "react-toastify";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = (props) => {
  const dispatch = useDispatch();
  const [productTrending, setProductTrending] = useState([]);
  const isLoading = useSelector((state) => state.product.isLoading);
  const isAuthenticated = useSelector((state) => {
    return state.user.isAuthenticated;
  });
  const [slideIndex, setSlideIndex] = useState(0);
  const [dataSlide, setDataSlide] = useState(2);

  const prevSlide = () => {
    setSlideIndex(slideIndex === 0 ? dataSlide - 1 : slideIndex - 1);
  };
  const nextSlide = () => {
    setSlideIndex(slideIndex === dataSlide - 1 ? 0 : slideIndex + 1);
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getAllProductTrending();
  }, []);

  const getAllProductTrending = async () => {
    try {
      let response = await fetchAllProductTrending();
      if (response && +response.EC === 0) {
        setProductTrending(response.DT);
      }
      // console.log(response.DT);
    } catch (error) {
      console.error("Error", error.message);
    }
  };
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  const handleClickProductDetails = (product) => {
    let productId = product.id;
    dispatch(fetchProductDetailsRedux(productId));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClickAddToWishlist = (productId) => {
    if (isAuthenticated === true) {
      dispatch(addProductToWishlistRedux(productId));
    } else {
      toast.error("You need to login to add products to the wishlist!");
    }
  };
  const stars = Array(5).fill(0);
  return (
    <main className="home-container">
      <div className="container">
        <div className="row">
          <div className="cover-slide ">
            <div className="left-slide col-xl-8 col-lg-12 col-md-12 col-12">
              {slideIndex === 0 ? (
                <>
                  <img src={slide1} alt="slide" className="fade-on" />
                  <div className="remind-slide fade-in">
                    <div className="remind-1 ">
                      Don't miss
                      <br /> amazing deals
                    </div>
                    <div className="remind-2 ">
                      Sign up for the daily newsletter
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <img src={slide3} alt="slide" className="fade-on" />
                  <div className="remind-slide fade-on">
                    <div className="remind-1">
                      Fresh Vegetables
                      <br />
                      Big discount
                    </div>
                    <div className="remind-2">
                      Save up to 50% off on your first order
                    </div>
                  </div>
                </>
              )}
              <div className="slide-transition">
                <span className="btn-prev" onClick={() => prevSlide()}>
                  ❮
                </span>
                <span className="btn-next" onClick={() => nextSlide()}>
                  ❯
                </span>
              </div>
              <div className="pagination-slide">
                <span
                  className={`dot ${slideIndex === 0 ? "dot-active" : ""}`}
                  onClick={() => setSlideIndex(0)}
                ></span>
                <span
                  className={`dot ${slideIndex === 1 ? "dot-active" : ""}`}
                  onClick={() => setSlideIndex(1)}
                ></span>
              </div>
            </div>

            <div className=" col-xl-4 d-none d-xl-block p-0 ps-4">
              <div className="right-slide ">
                <img src={slide2} alt="true" className="fade-in" />
                <div className="remind-3 fade-in">
                  Delivered to<span className="color-home">your home</span>
                </div>
                <div className="go-shop-btn fade-in">
                  <Link to="/shop">
                    <span>Shop Now </span>
                    <i class="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="home-product">
          <div className="container">
            <h1 className="title">Trendings products</h1>
            <div className="row">
              {isLoading === true ? (
                <div className="loading-container">
                  <Audio
                    height="80"
                    width="80"
                    radius="9"
                    color="green"
                    ariaLabel="loading"
                    wrapperStyle
                    wrapperClass
                  />
                  <div>LOADING DATA ...</div>
                </div>
              ) : (
                <>
                  {productTrending &&
                    productTrending.length &&
                    productTrending.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="col-lg-1-5 col-md-4 col-sm-6 col-12"
                        >
                          <div className="product-cart-wrap mb-4">
                            <div className="product-img-wrap">
                              <div className="product-img">
                                <Link
                                  to={`/product/${item.id}`}
                                  onClick={() =>
                                    handleClickProductDetails(item)
                                  }
                                >
                                  <img src={item.imageUrl} alt />
                                </Link>
                              </div>
                              <div className="product-status">
                                {item.status}
                              </div>
                              <div className="product-action">
                                <span
                                  aria-label="Add To Wishlist"
                                  className="favorite-btn"
                                  onClick={() =>
                                    handleClickAddToWishlist(item.id)
                                  }
                                >
                                  <i class="fa-regular fa-heart"></i>
                                </span>
                              </div>
                            </div>
                            <div className="product-content-wrap">
                              <div className="product-name-cover">
                                <Link
                                  to={`/product/${item.id}`}
                                  className="product-name"
                                  onClick={() =>
                                    handleClickProductDetails(item)
                                  }
                                >
                                  {truncateText(item.name, 29)}
                                </Link>
                              </div>
                              <div className="product-rate-cover">
                                <div className="product-rate p-0">
                                  <div className="product-rating">
                                    {stars.map((_, index) => {
                                      return (
                                        <FontAwesomeIcon
                                          icon={
                                            +item?.rating % 1 !== 0
                                              ? +item?.rating > index + 1 ||
                                                +item?.rating < index
                                                ? faStar
                                                : faStarHalfAlt
                                              : faStar
                                          }
                                          style={{
                                            height: "14px",
                                            width: "14px",
                                            cursor: "pointer",
                                            color:
                                              item?.rating === null
                                                ? "#FFBA5A"
                                                : +item?.rating > index
                                                ? "#FFBA5A"
                                                : "#A9A9A9A9",
                                          }}
                                        />
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                              <div className="product-category">
                                <span>{item.Category.name}</span>
                              </div>
                              <div className="product-cart-bottom">
                                <div className="product-price">
                                  <span>${item.price}</span>
                                </div>
                                <div className="product-view">
                                  <Link
                                    className="link-shop-product"
                                    to={`/product/${item.id}`}
                                    onClick={() =>
                                      handleClickProductDetails(item)
                                    }
                                  >
                                    <i class="fa-regular fa-eye"></i>
                                    Views
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
