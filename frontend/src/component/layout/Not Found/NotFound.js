import React from "react";
import ErrorIcon from "@material-ui/icons/Error";
import "./notfound.css";
import { Typography } from "@material-ui/core";
import { Link } from "@material-ui/core";

const NotFound = () => {
  return (
    <div className="PageNotFound">
      <ErrorIcon />
      <Typography>Page Not Found</Typography>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;
