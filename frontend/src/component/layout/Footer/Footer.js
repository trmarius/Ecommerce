import React from "react";
import "./Footer.css";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import LocalphoneIcon from "@material-ui/icons/LocalPhone";
import InstagramIcon from "@material-ui/icons/Instagram";
import { ImFacebook } from "react-icons/im";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        {/* <h4>DOWNLOAD OUR APP</h4> */}
        <p>Contacteaza-ne!</p>
        <h4>
          <a href="tel:40769319920">+40 769 319 920</a>
        </h4>
        {/* <img src={playStore} alt="playstore" />
        <img src={appStore} alt="AppStore" /> */}
        <div>
          <a href="https://wa.me/40769319920">
            <WhatsAppIcon className="whatsapp" />
          </a>
          <a href="tel:40769319920">
            <LocalphoneIcon className="phone" />
          </a>
        </div>
      </div>

      <div className="midFooter">
        <h1>Noova Glasses</h1>
        <p className="quality">Calitatea este prioritatea noastra!</p>

        <p className="copyright">Copyrights 2022 &copy; Marius</p>
      </div>

      <div className="rightFooter">
        <h4>Urmareste-ne!</h4>
        <a href="https://www.instagram.com/">
          <InstagramIcon className="instagram" />
        </a>
        <a href="https://www.facebook.com/">
          <div>
            <div>
              <ImFacebook className="facebook" />
            </div>
          </div>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
