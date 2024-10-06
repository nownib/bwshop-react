import { useDispatch, useSelector } from "react-redux";
import "./Account.scss";
import {
  fetchOrdersByIdRedux,
  fetchOrderDetailsRedux,
} from "../../redux/action/actions";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import { Audio } from "react-loader-spinner";
import OrderDetails from "./OrderDetails";

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const listOrders = useSelector((state) => state.order.listOrders);
  const isLoading = useSelector((state) => state.order.isLoading);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (user && user.isAuthenticated === true) {
      dispatch(fetchOrdersByIdRedux());
    } else {
      navigate("/login");
    }
  }, [user]);

  const handleViewOrderDetails = (orderId) => {
    dispatch(fetchOrderDetailsRedux(orderId));
    setShowOrderDetails(true);
  };

  const onHideModalUser = async () => {
    setShowOrderDetails(false);
  };

  return (
    <main>
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
          <div className="order">
            <div className="order-header">
              <h3>Your Orders</h3>
            </div>
            <div className="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listOrders && listOrders.length > 0 ? (
                    <>
                      {listOrders.map((item, index) => {
                        return (
                          <tr key={`row-${index}`}>
                            <td>#{index + 1}</td>
                            <td>
                              {moment(item.createTime).format(
                                "HH:mm DD/MM/YYYY"
                              )}
                            </td>
                            <td>{item.paymentMethod}</td>
                            <td>${item.totalPrice}</td>
                            <td className="btn-view">
                              <button
                                className="btn-green p-0 "
                                onClick={() => handleViewOrderDetails(item.id)}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <tr></tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      <OrderDetails show={showOrderDetails} onHide={onHideModalUser} />
    </main>
  );
};
export default Order;
