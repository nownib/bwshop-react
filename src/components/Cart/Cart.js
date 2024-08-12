import { useDispatch, useSelector } from "react-redux";
import "./Cart.scss";
import {
  fetchAllItemsInCartRedux,
  deleteProductInCartRedux,
} from "../../redux/action/actions";
import { useEffect } from "react";
import { Audio } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Cart = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.isAuthenticated === true) {
      dispatch(fetchAllItemsInCartRedux());
    } else {
      navigate("/login");
    }
  }, []);
  const dispatch = useDispatch();
  const listProductsInCart = useSelector((state) => {
    return state.cart.listProductsInCart;
  });
  const isLoading = useSelector((state) => state.cart.isLoading);

  const handleDeleteProductInCart = (value) => {
    let productId = value.id;
    dispatch(deleteProductInCartRedux(productId));
  };

  return (
    <>
      <div className="cart-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h1 className="heading-1">Your Cart</h1>
              <div className="heading-2">
                <h6>There are 2 products in your cart</h6>
                <h6>
                  <div>
                    <i class="fa fa-trash-o" aria-hidden="true"></i> Clear
                  </div>
                </h6>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <div className="table-product">
                <table className="table table-template">
                  <thead>
                    <tr>
                      <th scope="col" aria-colspan={2}>
                        Product
                      </th>
                      <th scope="col">Unit Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Subtotal</th>
                      <th scope="col">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
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
                        {listProductsInCart && listProductsInCart.length > 0 ? (
                          <>
                            {listProductsInCart.map((item, index) => {
                              return (
                                <tr key={`product-${index}`}>
                                  <th>
                                    <img
                                      src={item.imageUrl}
                                      style={{
                                        maxWidth: "120px",
                                        border: "1px solid #ececec",
                                        borderRadius: "15px",
                                      }}
                                      alt=""
                                    />
                                  </th>
                                  <td>{item.name}</td>
                                  <td>{item.price}</td>
                                  <td>{item.Carts.Cart_Items.quantity}</td>
                                  <td>
                                    <button
                                      className="btn"
                                      onClick={() =>
                                        handleDeleteProductInCart(item)
                                      }
                                    >
                                      <i
                                        class="fa fa-trash-o"
                                        aria-hidden="true"
                                      ></i>
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
                      </>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="back-to-shop">
                <Link to="/shop">
                  <i class="fa fa-arrow-left" aria-hidden="true"></i> Continue
                  Shopping
                </Link>
              </div>
            </div>
            <div className="col-lg-4"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
