import React, { useState } from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import CartIcon from "@material-ui/icons/ShoppingCart";
import AccountIcon from "@material-ui/icons/AccountBox";
import { useSelector } from "react-redux";

const options = {
  // burgerColor: "rgba(1, 93, 129, 0.8)",
  burgerColor: "tomato",
  burgerColorHover: "#a62d24",
  logo,
  logoWidth: "20vmax",
  navColor1: "rgba(0,0,0,0.6)",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Text: "Acasa",
  link2Text: "Produse",
  link3Text: "Contact",
  link4Text: "Despre noi",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.2vmax",
  // link1Color="rgba(35,35,35,0.7),"
  link1Color: "white",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "#fff",
  searchIconColor: "#fff",
  cartIconColor: "#fff",
  // profileIconColor: "rgba(35,35,35,0.8)",
  // searchIconColor: "rgba(35,35,35,0.8)",
  // cartIconColor: "rgba(35,35,35,0.8)",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
};

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);

  const handleLinkClicks = () => {
    window.scrollTo(0, 0);
    setOpenMenu(false);
  };

  return (
    <>
      <div className="react-navbar">
        <ReactNavbar {...options} />
      </div>
      <div className="navbar-mobile">
        <div className="navbar-mobile-container">
          <div className="navbar-mobile-container-col-1">
            <div
              className="navbar-mobile-menu"
              onClick={() => setOpenMenu(!openMenu)}
            >
              {openMenu ? <CloseIcon className="close-icon" /> : <MenuIcon />}

              <div>{openMenu ? "Închide" : "Meniu"}</div>
            </div>
          </div>
          <div className="navbar-mobile-container-col-2">
            <Link to="/" onClick={handleLinkClicks}>
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="navbar-mobile-container-col-3">
            <Link to="/search" onClick={handleLinkClicks}>
              <SearchIcon className="searchIcon" />
            </Link>
            <Link to="/cart" onClick={handleLinkClicks}>
              <CartIcon
                className={
                  cartItems.length > 0 ? "navFullCart" : "navEmptyCart"
                }
              />
            </Link>
            <Link to="/account" onClick={handleLinkClicks}>
              <AccountIcon className="accountIcon" />
            </Link>
          </div>
        </div>
        <div className="navbar-mobile-bottom">
          <div className="navbar-mobile-bottom-1"></div>
          <div className="navbar-mobile-bottom-2"></div>
          <div className="navbar-mobile-bottom-3"></div>
        </div>
      </div>
      {/* <div className="mobile-menu">
        <div className="mobile-menu-container">
          <div className="mobile-menu-open"> */}
      <ul className={openMenu ? "mobile-menu-active" : "mobile-menu"}>
        <li className="nav-item">
          <Link to="/" className="nav-links" onClick={handleLinkClicks}>
            Acasa
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/products" className="nav-links" onClick={handleLinkClicks}>
            Produse
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="nav-links" onClick={handleLinkClicks}>
            Contact
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-links" onClick={handleLinkClicks}>
            Despre noi
          </Link>
        </li>
      </ul>
      {/* </div>
        </div>
      </div> */}
    </>
  );
};

export default Header;
