import React, { Fragment } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const ConfirmOrder = ({ history }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  //   const shippingCharges = subtotal > 250 ? 0 : 200
  const shippingCharges = 19;

  const tax = subtotal * 0.18;
  const totalPrice = subtotal + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country} `;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    history.push("/process/payment");
    window.scrollTo(0, 0);
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Detalii Livrare</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Nume:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Telefon:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Adresa:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Produse Comandate:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} X {item.price} LEI ={" "}
                      <b>{item.price * item.quantity} LEI</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>{subtotal} LEI</span>
              </div>
              <div>
                <p>Livrare:</p>
                <span>{shippingCharges} LEI</span>
              </div>
              {/* <div>
                <p>GST:</p>
                <span>{tax} LEI</span>
              </div> */}
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>{totalPrice} LEI</span>
            </div>
            <button onClick={proceedToPayment}>Continua</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
