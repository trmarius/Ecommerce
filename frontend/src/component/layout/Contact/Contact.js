import React from "react";
import "./contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:marius.trufasu10@gmail.com">
        <Button>Contact: marius.trufasu10@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
