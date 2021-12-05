import React, { useContext } from "react";
import Shipping from "../../components/shipping/Shipping";
import Footers from "../../components/footers/Footers";

import BannerProduct from "./bannerProduct/BannerProduct";
import Filters from "./filters/Filters";
import ProductList from "./ProductList/ProductList";
import LoadMore from "./loadmore/LoadMore";
import SidebarWidget from "./sidebarwidget/SidebarWidget";
import { GlobalState } from "../../GlobalState";
function Products() {
  const state = useContext(GlobalState);
  const [, setSeach] = state.productsApi.search;

  const handleFilterChanges = (textSearchChange) => {
    setSeach(textSearchChange.searchFT);
    console.log(textSearchChange);
  };
  return (
    <div>
      <BannerProduct />
      <div className="shop_area shop_reverse mt-100 mb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-12">
              <SidebarWidget />
            </div>
            <div className="col-lg-9 col-md-12">
              <Filters onSubmit={handleFilterChanges} />
              <ProductList />
              <LoadMore />
            </div>
          </div>
        </div>
      </div>

      <Shipping />
      <Footers />
    </div>
  );
}

export default Products;
