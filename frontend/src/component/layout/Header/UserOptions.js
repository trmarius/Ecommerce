import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Fab from "@material-ui/core/Fab/Fab";
import { Badge } from "@material-ui/core";
import { styled } from "@material-ui/core";

const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);

  const [cartOpen, setCartOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "DashBoard",
      func: dashboard,
    });
  }

  function dashboard() {
    history.push("/admin/dashboard");
    window.scrollTo(0, 0);
  }

  function orders() {
    history.push("/orders");
    window.scrollTo(0, 0);
  }

  function account() {
    history.push("/account");
    window.scrollTo(0, 0);
  }

  function cart() {
    history.push("/cart");
    window.scrollTo(0, 0);
  }

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout successfully!");
  }

  return (
    <Fragment>
      <div className="UserDot">
        <Backdrop open={open} style={{ zIndex: "10" }} />
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          style={{ zIndex: "11" }}
          open={open}
          direction="down"
          className="speedDial"
          icon={
            <img
              className="speedDialIcon"
              src={user.avatar.url ? user.avatar.url : "./Profile.png"}
              alt="Profile"
            />
          }
        >
          {options.map((item) => (
            <SpeedDialAction
              key={item.name}
              icon={item.icon}
              tooltipTitle={item.name}
              onClick={item.func}
              tooltipOpen={window.innerWidth <= 600 ? true : false}
            />
          ))}
        </SpeedDial>
      </div>
      {cartItems.length > 0 && (
        <div className="cartOpen">
          <Fab
            color="default"
            aria-label="add"
            onClick={() => history.push("/cart")}
          >
            <StyledBadge
              badgeContent={cartItems.length}
              color="secondary"
              max={3}
            >
              <ShoppingCartIcon style={{ color: "unset" }} />
            </StyledBadge>
          </Fab>
        </div>
      )}
    </Fragment>
  );
};

export default UserOptions;
