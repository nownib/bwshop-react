import { useDispatch, useSelector } from "react-redux";
import "./Cart.scss";
import {
  fetchAllItemsInCartRedux,
  deleteProductInCartRedux,
  fetchProductDetailsRedux,
  updateProductInCartsRedux,
  clearCartRedux,
  addOrderRedux,
  fetchAllAddressRedux,
  setActiveRedux,
} from "../../redux/action/actions";
import { useEffect, useMemo, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Paypal from "./Paypal";
import Address from "./Address";
import { applyCoupon } from "../../services/cartService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const stars = Array(5).fill(0);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addressShipping, setAddressShipping] = useState("");
  const [checkedAddress, setCheckedAddress] = useState(null);
  const [coupon, setCoupon] = useState(undefined);
  const [codeCoupon, setCodeCoupon] = useState(undefined);
  const listAddress = useSelector((state) => {
    return state.address.listAddress;
  });
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
  const [editingQuantities, setEditingQuantities] = useState(
    listProductsInCart.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {})
  );

  const totalAmount = useMemo(() => {
    return listProductsInCart.reduce((total, item) => {
      const quantity =
        tempQuantities[item.id] !== undefined
          ? tempQuantities[item.id]
          : item.Carts?.Cart_Items?.quantity;
      return total + (item.price * 100 * quantity) / 100;
    }, 0);
  }, [listProductsInCart, tempQuantities]);

  const totalOrder = coupon
    ? totalAmount - (totalAmount * coupon.value) / 100
    : totalAmount;

  const cartSelected = listProductsInCart.map((item) => ({
    id: item.id,
    name: item.name,
    sku: item.sku,
    quantity:
      tempQuantities[item.id] !== undefined
        ? tempQuantities[item.id]
        : item.Carts.Cart_Items.quantity,
    price: item.price,
  }));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (user && user.isAuthenticated === true) {
      dispatch(fetchAllItemsInCartRedux());
      dispatch(fetchAllAddressRedux());
    } else {
      navigate("/login");
    }
  }, [user, tempQuantities, dispatch, navigate]);

  const handlePressEnter = async (event) => {
    if (event.key === "Enter") {
      await handleApplyCoupon();
    }
  };

  const handleApplyCoupon = async () => {
    try {
      let response = await applyCoupon(codeCoupon);
      if (response && response.EC === 0) {
        setCoupon(response.DT);
        toast.success("Apply coupon successfully!");
      } else if (response && response.EC === 2) {
        toast.error(response.EM);
      } else if (response && response.EC === 3) {
        toast.error(response.EM);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickProductDetails = (product) => {
    let productId = product.id;
    dispatch(fetchProductDetailsRedux(productId));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteProductInCart = (value) => {
    let productId = value.id;
    dispatch(deleteProductInCartRedux(productId));
  };

  const handleQuantityChange = (quantity, item) => {
    setEditingQuantities((state) => ({
      ...state,
      [item.id]: quantity,
    }));
  };
  const handleQuantityBlur = (item) => {
    const quantity = editingQuantities[item.id];
    if (quantity === "") {
      toast.error(`Please enter a valid quantity!`);
      setEditingQuantities((state) => ({
        ...state,
        [item.id]: tempQuantities[item.id],
      }));
      return;
    }

    if (quantity >= 1 && quantity <= item.stock) {
      setTempQuantities((state) => ({
        ...state,
        [item.id]: quantity,
      }));

      dispatch(updateProductInCartsRedux(item.id, quantity));
    } else {
      toast.error(
        `Quantity must be greater than 0 and less than or equal to stock ${item.stock}!`
      );
      setEditingQuantities((state) => ({
        ...state,
        [item.id]: tempQuantities[item.id],
      }));
    }
  };

  const hanldeDeleteAllCart = () => {
    dispatch(clearCartRedux());
    toast.success("Clear cart successfully!");
  };

  const handleClickCheckOut = () => {
    if (!addressShipping) {
      toast.error("Please choose shipping address!");
    } else if (listProductsInCart && listProductsInCart.length > 0) {
      let data = {
        totalPrice: totalOrder,
        address: addressShipping,
        paymentMethod: "Cash on delivery",
        paymentStatus: "NOT YET PAID",
        products: cartSelected,
        coupon: coupon?.code,
      };
      dispatch(addOrderRedux(data));
      dispatch(setActiveRedux(1));
      navigate("/account/orders");
    } else {
      toast.error("Cart is empty!");
    }
  };

  const handleCheckboxAddress = (item) => {
    if (checkedAddress === item.id) {
      setCheckedAddress(null);
      setAddressShipping("");
    } else {
      setCheckedAddress(item.id);
      setAddressShipping(
        `${item.specificAddress}, ${item.wards}, ${item.district}, ${item.province}`
      );
    }
  };
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
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
                    <h6 className="text-body me-2">
                      There are{" "}
                      <span className="text-color">
                        {listProductsInCart?.length}
                      </span>{" "}
                      products in your cart
                    </h6>
                    <h6 className="text-body">
                      <div
                        className="text-muted-clear"
                        onClick={() => hanldeDeleteAllCart()}
                      >
                        <i class="fa-regular fa-trash-can"></i> Clear cart
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
                                  <td
                                    className="item-price"
                                    data-title="Unit Price"
                                  >
                                    ${item.price}
                                  </td>
                                  <td
                                    className="item-quantity"
                                    data-title="Quantity"
                                  >
                                    <div className="quantity">
                                      <input
                                        type="number"
                                        value={
                                          //tạo mảng lưu all số lượng của sản phẩm trong giỏ hàng
                                          editingQuantities[item.id] ||
                                          item.Carts.Cart_Items.quantity
                                        }
                                        onChange={(event) =>
                                          handleQuantityChange(
                                            event.target.value,
                                            item
                                          )
                                        }
                                        onBlur={() => handleQuantityBlur(item)}
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
                                  <td
                                    className="item-total-price"
                                    data-title="Subtotal"
                                  >
                                    $
                                    {(
                                      (item.price *
                                        100 *
                                        (tempQuantities[item.id] !== undefined
                                          ? tempQuantities[item.id]
                                          : item.Carts.Cart_Items.quantity)) /
                                      100
                                    ).toFixed(2)}
                                  </td>
                                  <td className="item-btn" data-title="Remove">
                                    <button
                                      className="btn"
                                      onClick={() =>
                                        handleDeleteProductInCart(item)
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
                  <div className="devider"></div>
                  <div className="back-to-shop">
                    <Link to="/shop" className="btn-back">
                      <i class="fa fa-arrow-left" aria-hidden="true"></i>{" "}
                      Continue Shopping
                    </Link>
                  </div>
                  <div className="mt-4">
                    <Address />
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
                          <input
                            placeholder="Enter your code"
                            value={codeCoupon}
                            onChange={(event) =>
                              setCodeCoupon(event.target.value)
                            }
                            onKeyUp={(event) => handlePressEnter(event)}
                          />
                          <button
                            className="btn-apply"
                            onClick={() => handleApplyCoupon()}
                          >
                            <i class="fa-solid fa-ticket"></i> Apply
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
                                  <>{+totalAmount.toFixed(2)}</>
                                ) : (
                                  <>0.00</>
                                )}
                              </h4>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>
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
                              <h5 className="text-end">
                                - $
                                {coupon ? (
                                  <>
                                    {(
                                      (+totalAmount * coupon.value) /
                                      100
                                    ).toFixed(2)}
                                  </>
                                ) : (
                                  <>0.00</>
                                )}
                              </h5>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>
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
                                  <>{(+totalOrder).toFixed(2)}</>
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
                      {listAddress &&
                        listAddress.length > 0 &&
                        listAddress.map((item) => {
                          return (
                            <div class="mt-3" key={item.id}>
                              <input
                                type="checkbox"
                                className="form-input-checkbox"
                                checked={checkedAddress === item.id}
                                onChange={() => handleCheckboxAddress(item)}
                              />
                              <span className=" text-address">
                                {truncateText(item.specificAddress, 40)},{" "}
                                {item.wards}, {item.district}, {item.province}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                    <br className="line" />
                    <div>
                      <div class="mb-3 mt-4">
                        <button
                          type="button"
                          className="btn btn-checkout"
                          onClick={() => handleClickCheckOut()}
                        >
                          <span>
                            <i class="fa-solid fa-money-check-dollar"></i>{" "}
                            Proceed To CheckOut
                          </span>
                        </button>
                      </div>

                      <div style={{ maxWidth: "750px" }}>
                        <Paypal
                          address={addressShipping}
                          paymentMethod={"Paid via PayPal"}
                          amount={totalOrder}
                          orderDetails={cartSelected}
                          conpon={coupon?.code}
                        />
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

export default Cart;
