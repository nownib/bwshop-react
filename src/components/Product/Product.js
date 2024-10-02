import { useEffect, useState } from "react";
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
import {
  upSertReview,
  fetchReviewsByProduct,
  fetchRatingsByStar,
} from "../../services/productService";
import moment from "moment";
import { fetchProductDetailsRedux } from "../../redux/action/actions";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [listReviews, setListReviews] = useState([]);

  const isAuthenticated = useSelector((state) => {
    return state.user.isAuthenticated;
  });
  const productDetails = useSelector((state) => state.productDetails.product);
  const productId = productDetails.id;
  const isLoading = useSelector((state) => {
    return state.productDetails.isLoading;
  });

  useEffect(() => {
    getReviewsByProduct();
    getRatingsByStar();
  }, []);

  const getReviewsByProduct = async () => {
    const path = window.location.pathname;
    const id = path.split("/").pop();
    let response = await fetchReviewsByProduct(id);
    if (response && response.EC === 0) {
      setListReviews(response.DT);
    }
  };

  const handleClickAddToCart = (productId) => {
    try {
      if (isAuthenticated === true) {
        if (quantity <= productDetails?.stock) {
          dispatch(addProductToCartRedux(productId, +quantity));
        } else {
          toast.error("The quantity must not exceed the stock inventory!");
        }
      } else {
        toast.error("You need to login to add products to the cart!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (quantity) => {
    if (quantity) {
      setQuantity(quantity);
    }
  };
  const handleClickAddToWishlist = (productId) => {
    try {
      if (isAuthenticated === true) {
        dispatch(addProductToWishlistRedux(productId));
      } else {
        toast.error("You need to login to add products to the wishlist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const stars = Array(5).fill(0);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(undefined);
  const [review, setReview] = useState("");
  const [listBarRatings, setListBarRatings] = useState([]);

  const getRatingsByStar = async () => {
    try {
      const path = window.location.pathname;
      const id = path.split("/").pop();
      let response = await fetchRatingsByStar(id);
      if (response && response.EC === 0) {
        setListBarRatings(response.DT);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickRating = (value) => {
    setRating(value);
  };
  const handleMouseOver = (value) => {
    setHoverRating(value);
  };
  const handleMouseLeave = () => {
    setHoverRating(undefined);
  };

  const handleUpSertReview = async () => {
    try {
      if (rating) {
        let data = {
          productId: productId,
          review: review,
          rating: rating,
        };
        if (isAuthenticated === true) {
          let response = await upSertReview(data);
          if (response && response.EC === 0) {
            toast.success(response.EM);
            await getReviewsByProduct();
            await getRatingsByStar();
            setReview("");
            setRating(0);
            dispatch(fetchProductDetailsRedux(productId));
          }
        } else {
          toast.error("You need to log in to add a review!");
        }
      } else {
        toast.error("Rating is required!");
      }
    } catch (error) {
      console.log(error);
    }
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
                          <img src={productDetails?.imageUrl} alt="" />
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12 col-xs-12">
                        <div className="details">
                          <h2 className="title">{productDetails?.name}</h2>
                          <div className="product-rate-cover m-0">
                            <div className="product-rate">
                              <div className="product-rating">
                                {stars.map((_, index) => {
                                  return (
                                    <FontAwesomeIcon
                                      icon={
                                        +productDetails?.rating % 1 !== 0
                                          ? +productDetails?.rating >
                                              index + 1 ||
                                            +productDetails?.rating < index
                                            ? faStar
                                            : faStarHalfAlt
                                          : faStar
                                      }
                                      style={{
                                        height: "14px",
                                        width: "14px",
                                        cursor: "pointer",
                                        color:
                                          productDetails?.rating === null
                                            ? "#FFBA5A"
                                            : +productDetails?.rating > index
                                            ? "#FFBA5A"
                                            : "#A9A9A9A9",
                                      }}
                                    />
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                          <div className="product-price">
                            ${productDetails?.price}
                          </div>
                          <div className="product-description">
                            <p>{productDetails?.description}</p>
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
                                handleClickAddToCart(productDetails?.id)
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
                                handleClickAddToWishlist(productDetails?.id)
                              }
                            >
                              <i class="fa-regular fa-heart"></i>
                            </button>
                          </div>
                          <div className="details-footer m-0">
                            <div className="left-footer">
                              <p>
                                Category:{" "}
                                <span>{productDetails?.category}</span>
                              </p>
                              <p>
                                LIFE:{" "}
                                <span>
                                  {moment(
                                    productDetails?.createdAt ||
                                      "2024-07-15T13:52:10.000Z"
                                  )
                                    .add(1, "years")
                                    .format("ll")}
                                </span>
                              </p>
                            </div>
                            <div className="right-footer">
                              <p>
                                Stock:{" "}
                                <span>
                                  {productDetails?.stock} Items in stock
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
                          <div className="total-reviews">
                            Review ({listReviews?.length})
                          </div>
                          <div className="customer-review">
                            <div className="comment-area">
                              <div className="row">
                                <div className="col-lg-8">
                                  <h4 className="mb-30">
                                    Customer questions & answers
                                  </h4>
                                  <div className="comment-list">
                                    {listReviews &&
                                      listReviews.length > 0 &&
                                      listReviews.map((item) => {
                                        return (
                                          <div className="single-comment ">
                                            <div className="row user">
                                              <div className="col-md-3 thumb m-md-0">
                                                <img
                                                  src={
                                                    item.User.avatar || noAvatar
                                                  }
                                                  alt="Avatar"
                                                  style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    borderRadius: "50%",
                                                    marginLeft: "5px",
                                                  }}
                                                />
                                                <div class=" text-3 my-md-2 my-1">
                                                  {item.User.username}
                                                </div>
                                              </div>
                                              <div className="col-md-9 comment">
                                                <div className="left-comment">
                                                  <div className="font-size-13">
                                                    {moment(item.createdAt)
                                                      .format(`MMMM DD, YYYY [at]
                                                    h:mm a`)}
                                                  </div>
                                                  <div className="review-rating my-md-1">
                                                    <div className="font-size-14 me-md-3">
                                                      {item.review}
                                                    </div>
                                                    <div className="right-rate">
                                                      <div className="product-rate-cover">
                                                        <div className="product-rate p-0">
                                                          <div className="product-rating">
                                                            {stars.map(
                                                              (_, index) => {
                                                                return (
                                                                  <FontAwesomeIcon
                                                                    icon={
                                                                      faStar
                                                                    }
                                                                    style={{
                                                                      height:
                                                                        "12px",
                                                                      width:
                                                                        "12px",
                                                                      cursor:
                                                                        "pointer",
                                                                      color:
                                                                        "#FFBA5A",
                                                                      color:
                                                                        item.rating >
                                                                        index
                                                                          ? "#FFBA5A"
                                                                          : "#A9A9A9A9",
                                                                    }}
                                                                  />
                                                                );
                                                              }
                                                            )}
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <h4 className=" mb-md-4 mb-3 mt-30 mt-md-0">
                                    Customer reviews
                                  </h4>
                                  <div class="d-flex mb-30">
                                    <div class="product-rate p-0 mr-15">
                                      {stars.map((_, index) => {
                                        return (
                                          <FontAwesomeIcon
                                            icon={
                                              +productDetails?.rating % 1 !== 0
                                                ? +productDetails?.rating >
                                                    index + 1 ||
                                                  +productDetails?.rating <
                                                    index
                                                  ? faStar
                                                  : faStarHalfAlt
                                                : faStar
                                            }
                                            style={{
                                              height: "14px",
                                              width: "14px",
                                              cursor: "pointer",
                                              color:
                                                productDetails?.rating === null
                                                  ? "#FFBA5A"
                                                  : +productDetails?.rating >
                                                    index
                                                  ? "#FFBA5A"
                                                  : "#A9A9A9A9",
                                            }}
                                          />
                                        );
                                      })}
                                    </div>
                                    <h6>
                                      {productDetails?.rating === null
                                        ? 5
                                        : (+productDetails?.rating).toFixed(
                                            1
                                          )}{" "}
                                      out of 5
                                    </h6>
                                  </div>
                                  {listBarRatings &&
                                    listBarRatings.length > 0 &&
                                    listBarRatings.map((item, index) => {
                                      return (
                                        <div class="progress mt-3" key={index}>
                                          <span>
                                            {5 - index} star ({item.count})
                                          </span>
                                          <div className="progressbar-container">
                                            <div
                                              class="progress-bar"
                                              style={{
                                                width: `${item.average}%`,
                                              }}
                                            >
                                              {item.average}%
                                            </div>
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
                                                  : "rgb(228, 229, 233)",
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
                                        value={review}
                                        onChange={(event) =>
                                          setReview(event.target.value)
                                        }
                                      ></textarea>
                                    </div>
                                  </div>
                                </div>
                                <div className="btn-submit">
                                  <button
                                    className="btn-submit-review"
                                    onClick={() => handleUpSertReview()}
                                  >
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
