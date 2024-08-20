import "./Home.scss";
import slide1 from "../../assets/images/home-slide1.jpg";
import slide2 from "../../assets/images/home-slide2.jpg";
import slide3 from "../../assets/images/home-slide3.jpg";
import { useEffect, useState } from "react";
import { fetchAllProductTrending } from "../../services/productService";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Audio } from "react-loader-spinner";
import { fetchProductDetailsRedux } from "../../redux/action/actions";

const Home = (props) => {
  const dispatch = useDispatch();
  const [productTrending, setProductTrending] = useState([]);
  const isLoading = useSelector((state) => state.product.isLoading);
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

  return (
    <div className="home-container">
      <div className="row">
        <div className="cover-slide ">
          <div className="left-slide col-xl-8 col-lg-12 col-md-12 col-12">
            <img src={slide2} alt="true" />
            <div className="remind-slide">
              <div className="remind-1">
                Don't miss
                <br /> amazing deals
              </div>
              <div className="remind-2">Sign up for the daily newsletter</div>
            </div>
          </div>

          <div className=" col-xl-4 d-none d-xl-block p-0 ps-4">
            <div className="right-slide">
              <img src={slide3} alt="true" />
              <div className="remind-3">
                Delivered to<span className="color-home">your home</span>
              </div>
              <div className="go-shop-btn">
                <Link to="/shop">
                  Shop Now{" "}
                  <i className="fa fa-arrow-right" aria-hidden="true"></i>
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
                                onClick={() => handleClickProductDetails(item)}
                              >
                                <img src={item.imageUrl} alt />
                              </Link>
                            </div>
                            <div className="product-status">{item.status}</div>
                            <div className="product-action">
                              <span
                                aria-label="Add To Wishlist"
                                className="favorite-btn"
                              >
                                <i className="fa fa-heart-o"></i>
                              </span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-name-cover">
                              <Link
                                to={`/product/${item.id}`}
                                className="product-name"
                                onClick={() => handleClickProductDetails(item)}
                              >
                                {truncateText(item.name, 29)}
                              </Link>
                            </div>
                            <div className="product-rate-cover">
                              <div className="product-rate">
                                <div className="product-rating"></div>
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
                                  <i
                                    className="fa fa-eye"
                                    aria-hidden="true"
                                  ></i>
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
  );
};

export default Home;
