import React, { useContext } from "react";
// import pic1 from "./images/product_01.jpg";
// import pic2 from "./images/product_02.jpg";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";

function Intro() {
  const state = useContext(GlobalState);
  const [newProductHome] = state.productsApi.newProductHome;
  return (
    <div className="latest-products">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-heading">
              <h2>Latest Products</h2>
              <Link to="/products">
                view all products <i className="fa fa-angle-right"></i>
              </Link>
            </div>
          </div>
          {newProductHome.map((product) => (
            <Link to={`/detail/${product._id}`} key={product._id}>
              <div className="col-md-4" key={product._id}>
                <div className="product-item">
                  <img src={product.images.url} alt="" />

                  <div className="down-content">
                    <h4>{product.title}</h4>

                    <p>Tác phẩm của {product.author}</p>
                    <h6>${product.price}</h6>
                    <ul className="stars">
                      <li>
                        <i className="fa fa-star"></i>
                      </li>
                      <li>
                        <i className="fa fa-star"></i>
                      </li>
                      <li>
                        <i className="fa fa-star"></i>
                      </li>
                      <li>
                        <i className="fa fa-star"></i>
                      </li>
                      <li>
                        <i className="fa fa-star-half"></i>
                      </li>
                    </ul>
                    <span>Sold ({product.sold})</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* <div className="col-md-4">
            <div className="product-item">
              <Link to="#">
                <img src={pic2} alt="" />
              </Link>
              <div className="down-content">
                <Link to="#">
                  <h4>Tittle goes here</h4>
                </Link>
                <h6>$30.25</h6>
                <p>
                  Lorem ipsume dolor sit amet, adipisicing elite. Itaque,
                  corporis nulla aspernatur.
                </p>
                <ul className="stars">
                  <li>
                    <i className="fa fa-star"></i>
                  </li>
                  <li>
                    <i className="fa fa-star"></i>
                  </li>
                  <li>
                    <i className="fa fa-star"></i>
                  </li>
                  <li>
                    <i className="fa fa-star"></i>
                  </li>
                  <li>
                    <i className="fa fa-star"></i>
                  </li>
                </ul>
                <span>Reviews (21)</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Intro;
