import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllItemsInWishlistRedux,
  deleteProductInWishlistRedux,
  fetchProductDetailsRedux,
  addProductToCartRedux,
} from "../../redux/action/actions";
import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import { Link } from "react-router-dom";
import "./Wishlist.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

const Wishlist = () => {
  const stars = Array(5).fill(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => {
    return state.wishlist.isLoading;
  });
  const user = useSelector((state) => {
    return state.user;
  });

  const listProductsInWishlist = useSelector(
    (state) => state.wishlist.listProductsInWishlist
  );

  useEffect(() => {
    if (user && user.isAuthenticated === true) {
      dispatch(fetchAllItemsInWishlistRedux());
    } else {
      navigate("/login");
    }
  }, [user]);

  const handleClickProductDetails = (product) => {
    let productId = product.id;
    dispatch(fetchProductDetailsRedux(productId));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteProductInWishlist = (value) => {
    let productId = value.id;
    dispatch(deleteProductInWishlistRedux(productId));
  };

  const handleClickAddToCart = (productId) => {
    dispatch(addProductToCartRedux(productId, 1));
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
          <div className="wishlist-container">
            <div className="container mb-30 mt-50">
              <div className="row">
                <div className="col-xl-10 col-lg-12 m-auto">
                  <div className="mb-40">
                    <h1 className="heading-1">Your Wishlist</h1>
                    <div className="heading-2">
                      <h6 className="text-body">
                        There are{" "}
                        <span className="text-color">
                          {listProductsInWishlist.length}
                        </span>{" "}
                        products in your Wishlist
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-10 col-lg-12 m-auto">
                  <div className="table-product">
                    <table className="table table-template ">
                      <thead>
                        <tr className="main-heading">
                          <th scope="col" className="start pl-30" colspan="2">
                            Product
                          </th>
                          <th scope="col">Price</th>
                          <th scope="col">In Stock</th>
                          <th scope="col">Action</th>
                          <th scope="col" className="end">
                            Remove
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {listProductsInWishlist &&
                        listProductsInWishlist.length > 0 ? (
                          <>
                            {listProductsInWishlist.map((item, index) => {
                              return (
                                <tr key={`product-${index}`}>
                                  <td className="item-img">
                                    <img
                                      src={item.imageUrl}
                                      style={{
                                        maxWidth: "120px",
                                        border: "1px solid #ececec",
                                        borderRadius: "15px",
                                      }}
                                      alt=""
                                    />
                                  </td>
                                  <td className="item-name ps-md-5">
                                    <Link
                                      to={`/product/${item.id}`}
                                      className="item-name-link"
                                      onClick={() =>
                                        handleClickProductDetails(item)
                                      }
                                    >
                                      {item.name}
                                    </Link>
                                    <div className="product-rating">
                                      {stars.map((_, index) => {
                                        return (
                                          <FontAwesomeIcon
                                            icon={
                                              +item.rating % 1 !== 0
                                                ? +item.rating > index + 1 ||
                                                  +item.rating < index
                                                  ? faStar
                                                  : faStarHalfAlt
                                                : faStar
                                            }
                                            style={{
                                              height: "14px",
                                              width: "14px",
                                              cursor: "pointer",
                                              color:
                                                item.rating === null
                                                  ? "#FFBA5A"
                                                  : +item.rating > index
                                                  ? "#FFBA5A"
                                                  : "#A9A9A9A9",
                                            }}
                                          />
                                        );
                                      })}
                                      <span style={{ color: "#7e7e7e" }}>
                                        {" "}
                                        ({(+item.rating).toFixed(1)})
                                      </span>
                                    </div>
                                  </td>
                                  <td className="item-price" data-title="Price">
                                    ${item.price}
                                  </td>
                                  <td className="item-stock" data-title="Stock">
                                    {item.stock}
                                  </td>
                                  <td data-title="Cart">
                                    <button
                                      type="button"
                                      className="btn btn-add-to-cart"
                                      onClick={() =>
                                        handleClickAddToCart(item.id)
                                      }
                                    >
                                      <i class="fa-solid fa-cart-shopping"></i>
                                      {"  "}
                                      Add to cart
                                    </button>
                                  </td>
                                  <td className="item-btn" data-title="Remove">
                                    <button
                                      className="btn"
                                      onClick={() =>
                                        handleDeleteProductInWishlist(item)
                                      }
                                    >
                                      <i class="fa-regular fa-trash-can"></i>
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </>
                        ) : (
                          <>
                            <div></div>
                          </>
                        )}
                      </tbody>
                    </table>
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

export default Wishlist;
