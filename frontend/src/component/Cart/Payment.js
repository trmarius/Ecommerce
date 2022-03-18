import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import "./Payment.css";
import { createOrder, clearErrors } from "../../actions/orderAction";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import Loader from "../layout/Loader/Loader";

const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const alert = useAlert();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  // const { user } = useSelector((state) => state.user);
  const { loading, error, success } = useSelector((state) => state.newOrder);

  // const paymentData = {
  //   amount: Math.round(orderInfo.totalPrice * 100),
  // };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
    paymentInfo: { id: "100", status: "Ramburs" },
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(createOrder(order));
  };

  useEffect(() => {
    if (error) {
      payBtn.current.disabled = false;

      alert.error(error);
      // alert.error("There's some issue while processing payment ");

      dispatch(clearErrors());
    }

    if (success) {
      localStorage.removeItem("cartItems");
      window.location.reload(true);

      window.location.href = "/success";
    }
  }, [dispatch, error, alert, history, success]);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="paymentContainer">
            <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
              <Typography>Plata</Typography>
              <div>
                <LocalShippingIcon />
                <select required value={"Ramburs"}>
                  <option value="Ramburs">Plata ramburs la curier</option>
                </select>
              </div>
              <input
                type="submit"
                value={`Finalizare Comanda`}
                className="paymentFormBtn"
              />
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Payment;
