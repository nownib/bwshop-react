import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Product.scss";
import noAvatar from "../../assets/images/account-no-avatar.png";
import {
  addProductToCartRedux,
  addProductToWishlistRedux,
} from "../../redux/action/actions";
import { toast } from "react-toastify";
import { Audio } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const productId = useSelector((state) => {
    return state.productDetails.productId;
  });
  const isAuthenticated = useSelector((state) => {
    return state.user.isAuthenticated;
  });

  const productDetails = useSelector((state) =>
    state.product.listProducts.find((item) => item.id === productId)
  );
  const isLoading = useSelector((state) => {
    return state.product.isLoading;
  });

  const handleClickAddToCart = (productId) => {
    if (isAuthenticated === true) {
      if (quantity <= productDetails.stock) {
        dispatch(addProductToCartRedux(productId, +quantity));
      } else {
        toast.error("The quantity must not exceed the stock inventory!");
      }
    } else {
      toast.error("You need to login to add products to the cart!");
    }
  };
  const handleChange = (quantity) => {
    if (quantity) {
      setQuantity(quantity);
    }
  };
  const handleClickAddToWishlist = (productId) => {
    if (isAuthenticated === true) {
      dispatch(addProductToWishlistRedux(productId));
    } else {
      toast.error("You need to login to add products to the wishlist!");
    }
  };

  const stars = Array(5).fill(0);
  const barRating = Array(5).fill(0);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(undefined);
  const handleClickRating = (value) => {
    setRating(value);
  };
  const handleMouseOver = (value) => {
    setHoverRating(value);
  };
  const handleMouseLeave = () => {
    setHoverRating(undefined);
  };
  return (
    <>
      {isLoading === true ? (
        <>
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
        </>
      ) : (
        <>
          <div className="product-container">
            <div className="container">
              <div className="row">
                <div className="col-xl-10 col-lg-12 m-auto">
                  <div className="product-detail">
                    <div className="row">
                      <div className="col-md-6 col-sm-12 col-xs-12">
                        <div className="product-img">
                          <img src={productDetails.imageUrl} alt="" />
                        </div>
                      </div>

                      <div className="col-md-6 col-sm-12 col-xs-12">
                        <div className="details">
                          <h2 className="title">{productDetails.name}</h2>
                          <div className="product-rate-cover m-0">
                            <div className="product-rate">
                              <div className="product-rating">
                                {stars.map((_, index) => {
                                  return (
                                    <FontAwesomeIcon
                                      icon={faStar}
                                      style={{
                                        height: "16px",
                                        width: "16px",
                                        cursor: "pointer",
                                        color: "#FFBA5A",
                                      }}
                                    />
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                          <div className="product-price">
                            ${productDetails.price}
                          </div>
                          <div className="product-description">
                            <p>{productDetails.description}</p>
                          </div>
                          <div className="quantity">
                            <input
                              type="number"
                              value={quantity}
                              onChange={(event) =>
                                handleChange(event.target.value)
                              }
                              min="1"
                              max="19"
                              style={{
                                width: "80px",
                                height: "40px",
                                textAlign: "center",
                                border: "1px solid #ececec",
                                borderRadius: "8px",
                                fontFamily: `"Roboto", sans-serif`,
                              }}
                            />
                          </div>
                          <div className="add-to-cart">
                            <button
                              type="button"
                              className="btn-add-to-cart"
                              onClick={() =>
                                handleClickAddToCart(productDetails.id)
                              }
                            >
                              <i
                                className="fa fa-shopping-cart"
                                aria-hidden="true"
                              />
                              {"  "}
                              Add to cart
                            </button>
                            <button
                              type="button"
                              className="btn-add-to-wishlist"
                              onClick={() =>
                                handleClickAddToWishlist(productDetails.id)
                              }
                            >
                              <i class="fa-regular fa-heart"></i>
                            </button>
                          </div>
                          <div className="details-footer m-0">
                            <div className="left-footer">
                              <p>
                                Category:{" "}
                                <span>{productDetails.Category.name}</span>
                              </p>
                              <p>
                                LIFE: <span>2023-10-30T06:30:16.012Z</span>
                              </p>
                            </div>
                            <div className="right-footer">
                              <p>
                                Stock:{" "}
                                <span>
                                  {productDetails.stock} Items in stock
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="review-container">
                      <div className="tab-style3">
                        <div className="nav-tab">
                          <div className="total-reviews">Review (2)</div>
                          <div className="customer-review">
                            <div className="comment-area">
                              <div className="row">
                                <div className="col-lg-8 col-md-8">
                                  <h4 className="mb-30">
                                    Customer questions & answers
                                  </h4>
                                  <div className="comment-list">
                                    <div className="single-comment ">
                                      <div className="row user">
                                        <div className="col-3 thumb ">
                                          <img
                                            src={noAvatar}
                                            alt="Avatar"
                                            style={{
                                              minWidth: "50px",
                                              height: "50px",
                                              borderRadius: "50%",
                                            }}
                                          />
                                          <div class="no-wrap text-3 mt-1">
                                            Binn ok
                                          </div>
                                        </div>
                                        <div className="col-8 comment">
                                          <div className="left-comment">
                                            <div>May 30, 2024 at 3:12 am</div>
                                            <div className="d-flex justify-content-between my-1">
                                              <div>Đồ ăn rất ngon</div>
                                              <div className="right-rate">
                                                <div className="product-rate-cover">
                                                  <div className="product-rate p-0">
                                                    <div className="product-rating">
                                                      {stars.map((_, index) => {
                                                        return (
                                                          <FontAwesomeIcon
                                                            icon={faStar}
                                                            style={{
                                                              height: "12px",
                                                              width: "12px",
                                                              cursor: "pointer",
                                                              color: "#FFBA5A",
                                                            }}
                                                          />
                                                        );
                                                      })}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="single-comment ">
                                      <div className="row user">
                                        <div className="col-3 thumb ">
                                          <img
                                            src={noAvatar}
                                            alt="Avatar"
                                            style={{
                                              minWidth: "50px",
                                              height: "50px",
                                              borderRadius: "50%",
                                            }}
                                          />
                                          <div class="no-wrap text-3 mt-1">
                                            Binn ok
                                          </div>
                                        </div>
                                        <div className="col-8 comment">
                                          <div className="left-comment">
                                            <div>May 30, 2024 at 3:12 am</div>
                                            <div className="d-flex justify-content-between my-1">
                                              <div>Đồ ăn rất ngon</div>
                                              <div className="right-rate">
                                                <div className="product-rate-cover">
                                                  <div className="product-rate p-0">
                                                    <div className="product-rating">
                                                      {stars.map((_, index) => {
                                                        return (
                                                          <FontAwesomeIcon
                                                            icon={faStar}
                                                            style={{
                                                              height: "12px",
                                                              width: "12px",
                                                              cursor: "pointer",
                                                              color: "#FFBA5A",
                                                            }}
                                                          />
                                                        );
                                                      })}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4">
                                  <h4 className=" mb-md-4 mb-3 mt-30 mt-md-0">
                                    Customer reviews
                                  </h4>
                                  <div class="d-flex mb-30">
                                    <div class="product-rate p-0 mr-15">
                                      {stars.map((_, index) => {
                                        return (
                                          <FontAwesomeIcon
                                            icon={faStar}
                                            style={{
                                              height: "14px",
                                              width: "14px",
                                              cursor: "pointer",
                                              color: "#FFBA5A",
                                            }}
                                          />
                                        );
                                      })}
                                    </div>
                                    <h6>5 out of 5</h6>
                                  </div>
                                  {barRating.map((_, index) => {
                                    return (
                                      <div class="progress mt-3" key={index}>
                                        <span>{5 - index} star (117)</span>
                                        <div
                                          class="progress-bar"
                                          style={{ width: "66.77%" }}
                                        >
                                          66.67%
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="comment-form">
                              <h4 className="mb-15">Add a review</h4>
                              <div className="col-lg-8 col-md-12">
                                <div className="row">
                                  <div className="col-12">
                                    <div className="star">
                                      {stars.map((_, index) => {
                                        return (
                                          <FontAwesomeIcon
                                            key={index}
                                            icon={faStar}
                                            style={{
                                              height: "28px",
                                              width: "28px",
                                              cursor: "pointer",
                                              color:
                                                (hoverRating || rating) > index
                                                  ? "#FFBA5A"
                                                  : "#A9A9A9",
                                            }}
                                            onClick={() =>
                                              handleClickRating(index + 1)
                                            }
                                            onMouseOver={() =>
                                              handleMouseOver(index + 1)
                                            }
                                            onMouseLeave={() =>
                                              handleMouseLeave()
                                            }
                                          />
                                        );
                                      })}
                                    </div>

                                    <div className="form-group mt-1 mb-0">
                                      <textarea
                                        className="form-control"
                                        placeholder="Write comment"
                                        name="comment"
                                        id="comment"
                                        cols={30}
                                        rows={9}
                                      ></textarea>
                                    </div>
                                  </div>
                                </div>
                                <div className="btn-submit">
                                  <button className="btn-submit-review">
                                    Submit reviews
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
