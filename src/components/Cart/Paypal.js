import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { addOrderRedux } from "../../redux/action/actions";
import { toast } from "react-toastify";

const Paypal = (props) => {
  const style = { layout: "vertical" };
  const { amount, address, paymentMethod, orderDetails } = props;

  if (!orderDetails || orderDetails.length === 0) {
    toast.error("Cart is empty!");
    return;
  }
  const ButtonWrapper = ({ currency, showSpinner, amount }) => {
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
    // useEffect(() => {
    //   dispatch({
    //     type: "resetOptions",
    //     value: { ...options, currency: currency },
    //   });
    // }, [currency]);
    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[style, currency, amount]}
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
                let data = {
                  totalPrice: amount,
                  address: address,
                  paymentMethod: paymentMethod,
                  paymentStatus: "PAID",
                };
                dispatch(addOrderRedux(data));
              }
            })
          }
        />
      </>
    );
  };

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.REACT_APP_CLIENT_ID_PAYPAL,
        components: "buttons",
        currency: "USD",
      }}
    >
      <ButtonWrapper showSpinner={false} currency={"USD"} amount={amount} />
    </PayPalScriptProvider>
  );
};
export default Paypal;
