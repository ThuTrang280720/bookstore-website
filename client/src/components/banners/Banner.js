import React from "react";
// import Banner1 from "../../assets/images/slide_01.jpg";
import Banner1 from "../../template/assets/images/slide_01.jpg";
function Banner() {
  return (
    <banner>
      <div className="banner header-text">
        <div className="owl-banner ">
          <div
            className="banner-item-01"
            style={{ backgroundImage: `url(${Banner1})` }}
          >
            <div className="text-content">
              <h4>Nature and books belong to the eyes that see them.</h4>
              <h2>Wellcome in the Book Store</h2>
            </div>
          </div>
          {/* <div className="banner-item-02">
            <div className="text-content">
              <h4>Flash Deals</h4>
              <h2>Get your best products</h2>
            </div>
          </div>
          <div className="banner-item-03">
            <div className="text-content">
              <h4>Last Minute</h4>
              <h2>Grab last minute deals</h2>
            </div>
          </div> */}
        </div>
      </div>
      <script src="../../assets/js/owl.js"></script>
    </banner>
  );
}

export default Banner;
