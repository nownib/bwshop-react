import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Product.scss";
import {
  addProductToCartRedux,
  addProductToWishlistRedux,
} from "../../redux/action/actions";
import { toast } from "react-toastify";
import { Audio } from "react-loader-spinner";

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
                          <div className="product-rate-cover">
                            <div className="product-rate">
                              <div className="product-rating"></div>
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
                          <div className="total-reviews">Review(2)</div>
                          <div className="customer-review">
                            <div className="comment-area">
                              <div className="row">
                                <div className="col-lg-8">
                                  <h4>Customer questions & answers</h4>
                                  <div className="comment-list">
                                    <div className="single-comment">
                                      <div className="row user">
                                        <div className="col-4">Avatar-Name</div>
                                        <div className="col-8 comment">
                                          <div className="left-comment col-8">
                                            <div>May 30, 2024 at 3:12 am</div>
                                            <div>
                                              Đây là commentĐây là commentĐây là
                                              commentĐây là commentĐây là
                                              commentĐây là commentĐây là
                                              comment
                                            </div>
                                          </div>

                                          <div className="right-rate col-4">
                                            <div className="product-rate-cover">
                                              <div className="product-rate">
                                                <div className="product-rating"></div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">Customer reviews</div>
                              </div>
                            </div>
                            <div className="comment-form">
                              <h4>Add a review</h4>
                              <div className="col-lg-8 col-md-12">
                                <div className="row">
                                  <div className="col-12">
                                    <div>SAO SAO SAO SAO SAO</div>

                                    <div className="form-group">
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
