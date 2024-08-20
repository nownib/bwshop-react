import { useDispatch, useSelector } from "react-redux";
import "./Cart.scss";
import {
  fetchAllItemsInCartRedux,
  deleteProductInCartRedux,
  fetchProductDetailsRedux,
  updateProductInCartsRedux,
  clearCartRedux,
  addOrderRedux,
} from "../../redux/action/actions";
import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Paypal from "./Paypal";

const Cart = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listProductsInCart = useSelector((state) => {
    return state.cart.listProductsInCart;
  });
  const isLoading = useSelector((state) => state.cart.isLoading);
  const [tempQuantities, setTempQuantities] = useState(
    listProductsInCart.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {})
  );
  const totalAmount = listProductsInCart
    .reduce((total, item) => {
      const quantity =
        tempQuantities[item.id] !== undefined
          ? tempQuantities[item.id]
          : item.Carts.Cart_Items.quantity;
      return total + item.price * quantity;
    }, 0)
    .toFixed(2);

  const cartSelected = listProductsInCart.map((item) => ({
    name: item.name,
    sku: item.sku,
    quantity:
      tempQuantities[item.id] !== undefined
        ? tempQuantities[item.id]
        : item.Carts.Cart_Items.quantity,
    price: item.price,
  }));

  const [paymentMethod, setPaymentMethod] = useState("CashPayment");

  useEffect(() => {
    // window.scrollTo({ top: 0, behavior: "smooth" });
    if (user && user.isAuthenticated === true) {
      dispatch(fetchAllItemsInCartRedux());
    } else {
      navigate("/login");
    }
  }, [user, tempQuantities]);

  const handleClickProductDetails = (product) => {
    let productId = product.id;
    dispatch(fetchProductDetailsRedux(productId));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteProductInCart = (value) => {
    let productId = value.id;
    dispatch(deleteProductInCartRedux(productId));
  };

  // const throttledUpdate = throttle((productId, quantity) => {
  //   dispatch(updatedProductInCartsRedux(productId, quantity));
  // }, 10000); //
  // const handleQuantityChangeDebounced = debounce((productId, quantity) => {
  //   dispatch(updateProductInCartsRedux(productId, quantity));
  // }, 500);

  const handleQuantityChange = (quantity, item) => {
    if (quantity >= 1 && quantity <= item.stock) {
      setTempQuantities((state) => ({
        ...state,
        [item.id]: quantity,
      }));
      dispatch(updateProductInCartsRedux(item.id, quantity));
    } else {
      toast.error(`The quantity must be less than ${item.stock}.`);
    }
  };
  const hanldeDeleteAllCart = () => {
    dispatch(clearCartRedux());
    toast.success("Clear cart successfully!");
  };
  const handleApply = () => {
    toast.error("Coupon is valid!");
  };

  const handleChangePaymentMethod = (value) => {
    setPaymentMethod(value);
  };

  const handleClickCheckOut = () => {
    let data = {
      totalPrice: totalAmount,
      address: "Ngã tư đường",
      paymentMethod: "Cash",
      paymentStatus: "NOT YET PAID",
    };
    dispatch(addOrderRedux(data));
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
          <div className="cart-container">
            <div className="container mb-80 mt-50">
              <div className="row">
                <div className="col-lg-8 mb-40">
                  <h1 className="heading-1">Your Cart</h1>
                  <div className="heading-2">
                    <h6 className="text-body">
                      There are{" "}
                      <span className="text-color">
                        {listProductsInCart.length}
                      </span>{" "}
                      products in your cart
                    </h6>
                    <h6 className="text-body">
                      <div
                        className="text-muted-clear"
                        onClick={() => hanldeDeleteAllCart()}
                      >
                        <i class="fa fa-trash-o" aria-hidden="true"></i> Clear
                        cart
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
                        <tr className="main-heading">
                          <th scope="col" className="start pl-30" colspan="2">
                            Product
                          </th>
                          <th scope="col">Unit Price</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Subtotal</th>
                          <th scope="col" className="end">
                            Remove
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {listProductsInCart && listProductsInCart.length > 0 ? (
                          <>
                            {listProductsInCart.map((item, index) => {
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
                                  <td className="item-name">
                                    <Link
                                      to={`/product/${item.id}`}
                                      className="item-name-link"
                                      onClick={() =>
                                        handleClickProductDetails(item)
                                      }
                                    >
                                      {item.name}
                                    </Link>
                                  </td>
                                  <td className="item-price">${item.price}</td>
                                  <td className="item-quantity">
                                    <div className="quantity">
                                      <input
                                        type="number"
                                        value={
                                          //tạo mảng lưu all số lượng của sản phẩm trong giỏ hàng
                                          tempQuantities[item.id] ||
                                          item.Carts.Cart_Items.quantity
                                        }
                                        onChange={(event) =>
                                          handleQuantityChange(
                                            event.target.value,
                                            item
                                          )
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
                                  </td>
                                  <td className="item-total-price">
                                    $
                                    {(
                                      item.price *
                                      (tempQuantities[item.id] !== undefined
                                        ? tempQuantities[item.id]
                                        : item.Carts.Cart_Items.quantity)
                                    ).toFixed(2)}
                                  </td>
                                  <td className="item-btn">
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
                      </tbody>
                    </table>
                  </div>
                  <div className="devider"></div>
                  <div className="back-to-shop">
                    <Link to="/shop" className="btn-back">
                      <i class="fa fa-arrow-left" aria-hidden="true"></i>{" "}
                      Continue Shopping
                    </Link>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="row cart-total-header">
                    <div className="col-lg-12">
                      <div className="p-40">
                        <h4 className="mb-10 ">Apply Coupon</h4>
                        <p className="mb-30">
                          <span className="text-muted">
                            Using A Promo Code?
                          </span>
                        </p>
                        <div className="form-coupon">
                          <input placeholder="Enter your code" />
                          <button
                            className="btn-apply"
                            onClick={() => handleApply()}
                          >
                            <i
                              class="fa fa-shirtsinbulk"
                              aria-hidden="true"
                            ></i>{" "}
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="cart-total-body">
                    <div className="table-total">
                      <table className="table">
                        <tbody>
                          <tr>
                            <td>
                              <h6 className="text-muted">Subtotal</h6>
                            </td>
                            <td>
                              <h4 className="text-brand text-end ">
                                $
                                {listProductsInCart &&
                                listProductsInCart.length > 0 ? (
                                  <>
                                    {listProductsInCart
                                      .reduce((total, item) => {
                                        return (
                                          total +
                                          item.price *
                                            (tempQuantities[item.id] !==
                                            undefined
                                              ? tempQuantities[item.id]
                                              : item.Carts.Cart_Items.quantity)
                                        );
                                      }, 0)
                                      .toFixed(2)}
                                  </>
                                ) : (
                                  <>0.00</>
                                )}
                              </h4>
                            </td>
                          </tr>
                          <tr>
                            <td scope="col" colSpan={2}>
                              <div className="divider-line mt-10 mb-10"></div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h6 className="text-muted">Shipping</h6>
                            </td>
                            <td>
                              <h5 className="text-end ">Free</h5>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              {" "}
                              <h6 className="text-muted">Discount</h6>
                            </td>
                            <td>
                              {" "}
                              <h5 className="text-end">- $0.00</h5>
                            </td>
                          </tr>
                          <tr>
                            <td scope="col" colSpan={2}>
                              <div className="divider-line mt-10 mb-10"></div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h6 className="text-muted">Total</h6>
                            </td>
                            <td>
                              {" "}
                              <h4 className="text-end text-brand">
                                $
                                {listProductsInCart &&
                                listProductsInCart.length > 0 ? (
                                  <>
                                    {listProductsInCart
                                      .reduce((total, item) => {
                                        return (
                                          total +
                                          item.price *
                                            (tempQuantities[item.id] !==
                                            undefined
                                              ? tempQuantities[item.id]
                                              : item.Carts.Cart_Items.quantity)
                                        );
                                      }, 0)
                                      .toFixed(2)}
                                  </>
                                ) : (
                                  <>0.00</>
                                )}
                              </h4>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <br className="line" />
                    <div className="address">
                      <h5>Delivery address</h5>
                    </div>
                    <br className="line" />

                    <div className="custome-checkbox">
                      <div>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="CashPayment"
                          value="CashPayment"
                          checked={paymentMethod === "CashPayment"}
                          onChange={(event) =>
                            handleChangePaymentMethod(event.target.value)
                          }
                        />
                        <label
                          htmlFor="CashPayment"
                          className="form-check-label"
                        >
                          Cash Payment
                        </label>
                      </div>
                      <div>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="CardPayment"
                          value="CardPayment"
                          checked={paymentMethod === "CardPayment"}
                          onChange={(event) =>
                            handleChangePaymentMethod(event.target.value)
                          }
                        />
                        <label
                          htmlFor="CardPayment"
                          className="form-check-label"
                        >
                          Credit Card Payment
                        </label>
                      </div>
                    </div>
                    <div>
                      {paymentMethod === "CardPayment" ? (
                        <>
                          <div
                            style={{ maxWidth: "750px", minHeight: "100px" }}
                          >
                            <Paypal
                              address={"Ngã 3 chợ Muối"}
                              paymentMethod={"Paypal"}
                              amount={totalAmount}
                              orderDetails={cartSelected}
                            />
                          </div>
                        </>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-checkout"
                          onClick={() => handleClickCheckOut()}
                        >
                          Proceed To CheckOut
                        </button>
                      )}
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

export default Cart;
