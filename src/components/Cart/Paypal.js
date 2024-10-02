import React, { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { addOrderRedux } from "../../redux/action/actions";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const ButtonWrapper = React.memo(
  ({
    currency,
    amount,
    address,
    paymentMethod,
    orderDetails,
    coupon,
    onSuccess,
  }) => {
    const [{ options }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: { ...options, currency: currency },
      });
    }, [currency, address, amount, coupon]);
    const handleClick = (data, actions) => {
      if (!address) {
        toast.error("Please choose shipping address!");
        return actions.reject();
      }
      if (!orderDetails || orderDetails.length <= 0) {
        toast.error("Cart is empty!");
        return actions.reject();
      }
      return actions.resolve();
    };
    return (
      <PayPalButtons
        style={{ layout: "vertical" }}
        disabled={false}
        forceReRender={[currency, amount]}
        fundingSource={undefined}
        onClick={(data, actions) => handleClick(data, actions)}
        createOrder={(data, actions) =>
          actions.order
            .create({
              purchase_units: [
                {
                  amount: { currency_code: currency, value: amount },
                },
              ],
            })
            .then((orderID) => orderID)
        }
        onApprove={(data, actions) =>
          actions.order.capture().then(async (response) => {
            if (response.status === "COMPLETED") {
              const data = {
                totalPrice: amount,
                address: address,
                paymentMethod: paymentMethod,
                paymentStatus: "PAID",
                products: orderDetails ? orderDetails : [],
                coupon: coupon,
              };
              onSuccess(data);
            }
          })
        }
      />
    );
  }
);

const Paypal = (props) => {
  const { amount, address, paymentMethod, orderDetails, coupon } = props;
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (orderData) {
      dispatch(addOrderRedux(orderData));
    }
  }, [orderData, dispatch]);

  const handleSuccess = (data) => {
    setOrderData(data);
  };
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.REACT_APP_CLIENT_ID_PAYPAL,
        components: "buttons",
        currency: "USD",
      }}
    >
      <ButtonWrapper
        currency={"USD"}
        amount={amount}
        address={address}
        paymentMethod={paymentMethod}
        orderDetails={orderDetails}
        coupon={coupon}
        onSuccess={handleSuccess}
      />
    </PayPalScriptProvider>
  );
};

export default Paypal;
