import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./OrderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />
      <Typography>Comanda dumneavoastra a fost plasata cu succes!</Typography>
      <Link to="/orders">Comenzile Tale</Link>
    </div>
  );
};

export default OrderSuccess;
