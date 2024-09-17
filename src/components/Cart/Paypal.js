import React, { useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { addOrderRedux } from "../../redux/action/actions";
import { toast } from "react-toastify";

const ButtonWrapper = React.memo(
  ({ currency, amount, address, paymentMethod, orderDetails, method }) => {
    const [{ options }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: { ...options, currency: currency },
      });
    }, [currency, method]);

    return (
      <PayPalButtons
        style={{ layout: "vertical" }}
        disabled={false}
        forceReRender={[currency, amount]}
        fundingSource={undefined}
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
                products: orderDetails,
              };
              dispatch(addOrderRedux(data));
            }
          })
        }
      />
    );
  }
);

const Paypal = (props) => {
  const { amount, address, paymentMethod, orderDetails, method } = props;

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.REACT_APP_CLIENT_ID_PAYPAL,
        components: "buttons",
        currency: "USD",
      }}
    >
      <ButtonWrapper
        method={method}
        currency={"USD"}
        amount={amount}
        address={address}
        paymentMethod={paymentMethod}
        orderDetails={orderDetails}
      />
    </PayPalScriptProvider>
  );
};

export default Paypal;
