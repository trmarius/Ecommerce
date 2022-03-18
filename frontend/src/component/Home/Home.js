import React, { Fragment, useEffect } from "react";
import "./Home.css";
import sgImage from "../../images/sunglasses3.png";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import ProductCard from "./ProductCard";
import ShopIcon from "@material-ui/icons/ShoppingBasket";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Ochelari de soare top" />

          <div className="banner">
            <div className="banner-container">
              <p>Welcome!</p>

              <img src={sgImage} alt=""></img>

              <h1>NOOVA GLASSES</h1>

              <a href="#container">
                <button>
                  Produse <ShopIcon />
                </button>
              </a>
            </div>
          </div>

          <h2 className="homeHeading">Ultimele Produse</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
