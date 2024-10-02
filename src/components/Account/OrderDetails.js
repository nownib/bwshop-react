import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./OrderDetails.scss";
import { Link } from "react-router-dom";
import { fetchProductDetailsRedux } from "../../redux/action/actions";

const OrderDetails = (props) => {
  const dispatch = useDispatch();
  const listOrderItems = useSelector((state) => state.order.orderDetails);
  const orderItems = listOrderItems.orderItems;

  const handleClickProductDetails = (product) => {
    let productId = product.id;
    dispatch(fetchProductDetailsRedux(productId));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        className="p-0 order-details-container"
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orderItems && orderItems.length > 0 ? (
            <>
              {orderItems.map((item, index) => {
                return (
                  <div key={`row-${index}`}>
                    <div class="d-flex mt-2 mb-4">
                      <div className="product-img-order">
                        <Link
                          to={`/product/${item.product.id}`}
                          onClick={() =>
                            handleClickProductDetails(item.product)
                          }
                        >
                          <img
                            src={item.product.imageUrl}
                            style={{
                              maxWidth: "120px",
                              maxHeight: "120px",
                              border: "1px solid #ececec",
                              borderRadius: "15px",
                            }}
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="d-flex-column ps-2">
                        <p className="m-0">
                          <Link
                            to={`/product/${item.id}`}
                            className="item-name-link"
                            onClick={() =>
                              handleClickProductDetails(item.product)
                            }
                          >
                            {truncateText(item.product.name, 45)}
                          </Link>
                        </p>
                        <div className="">
                          <p className="text-14 m-0">
                            Price: ${item.product.price}/ 1 product
                          </p>
                          <p className="text-14 mb-1">
                            Quantity: {item.quantity}
                          </p>
                          <h5>
                            Total:{" "}
                            <span className="item-total">
                              $
                              {(
                                (item.product.price * item.quantity * 100) /
                                100
                              ).toFixed(2)}
                            </span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <></>
          )}
          <div className="mt-5">
            <h5 className="mb-2">
              Coupon:{" "}
              <span className="item-total">
                {listOrderItems?.coupon ? listOrderItems?.coupon : ""}
              </span>
            </h5>
            <h5 className="mb-2">
              Total payment:{" "}
              <span className="item-total">${listOrderItems?.totalPrice}</span>
            </h5>
            <p className="mb-2">Delivery address: {listOrderItems?.address}</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OrderDetails;
