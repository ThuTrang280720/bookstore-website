import { SavedSearch } from "@mui/icons-material";
import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import "./sidebarwidget.css";
// import QC1 from "./images/QC1.jpg";
import QC2 from "./images/QC2.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  minPrice: 0,
  maxPrice: "",
};
export default function SidebarWidget() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesApi.categories;
  const [, setCategory] = state.productsApi.category;
  const [, setPage] = state.productsApi.page;
  //const [result] = state.productsApi.result;
  const [search, setSearch] = state.productsApi.search;
  const [startPrice, setStartPrice] = state.productsApi.startPrice;
  const [endPrice, setEndPrice] = state.productsApi.endPrice;
  const [totalResult] = state.productsApi.totalResult;
  const [showResult, setShowResult] = useState(false);
  const [hisSearch] = useState([
    "Em",
    "Nhà Giả Kim",
    "Tâm Hồn",
    "Tình Yêu",
    "Tuổi Trẻ",
    "Hoá Học",
  ]);
  hisSearch.unshift(search && search !== " " ? search : null);
  function unique(arr) {
    return Array.from(new Set(arr)); //
  }
  // setHisSearch(add.join(""));
  const add = unique(hisSearch);
  console.log(add);
  // setHisSearch(hisSearch.push("alo"));
  const [filterPrice, setFilterPrice] = useState(initialState);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFilterPrice({ ...filterPrice, [name]: value });
  };

  const SelectCategory = (name) => {
    setCategory(name);
    setPage(1);
    setSearch("");
  };
  const submitPrice = (e) => {
    e.preventDefault();
    if (!filterPrice.maxPrice)
      return toast.warning("Max price must have valid");
    if (filterPrice.maxPrice < filterPrice.minPrice)
      return toast.warning("Max price must above Min price");
    if (filterPrice.maxPrice <= 0 || filterPrice.minPrice < 0)
      return toast.warning("Value must be positive");
    setShowResult(true);
    setStartPrice(filterPrice.minPrice);
    setEndPrice(filterPrice.maxPrice);
  };
  const cancelFilter = (e) => {
    setShowResult(false);
    setFilterPrice(initialState);
    setStartPrice(0);
    setEndPrice(1e3);
  };
  return (
    <div className="sidebar_widget">
      <div className="widget_inner">
        <div className="widget_list widget_categories">
          <h3>Categories</h3>
          <ul>
            <li
              className="widget_sub_categories sub_categories1"
              onClick={() => SelectCategory("")}
            >
              <span>All categories</span>
            </li>
            {categories.map((category) => (
              <li
                className="widget_sub_categories sub_categories1"
                key={category._id}
                onClick={() => SelectCategory("category=" + category.name)}
              >
                <span>{category.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="widget_list widget_prices">
          <h3>Filter</h3>
          <form onSubmit={submitPrice}>
            <div className="filter-prices">
              <span>Prices: </span>
              <input
                type="number"
                name="minPrice"
                placeholder="Min price"
                value={filterPrice.minPrice}
                onChange={handleChangeInput}
              />
              <span>~</span>
              <input
                type="number"
                name="maxPrice"
                placeholder="Max price"
                value={filterPrice.maxPrice}
                onChange={handleChangeInput}
              />
            </div>
            <div className="filter_result">
              <button type="submit">Filter</button>
              {showResult ? (
                <div>
                  <span>Result({totalResult})</span>
                  <span>
                    ${startPrice} ~ ${endPrice}
                  </span>
                </div>
              ) : (
                <i>
                  <span>Input filter here</span>
                </i>
              )}
            </div>
          </form>
          <ul>
            <li className="hint-prices" onClick={cancelFilter}>
              None limit
            </li>
            <li className="hint-prices">$1.00 ~ $10.00</li>
            <li className="hint-prices">$10.00 ~ $20.00</li>
            <li className="hint-prices">$20.00 ~ $40.00</li>
          </ul>
        </div>
        <div className="widget_list widget_trends">
          <img src={QC2} alt="" />
        </div>
        <div className="widget_list widget_tags">
          <h3>
            <SavedSearch />
            Search Tag
          </h3>
          <div className="hint-search">
            {/* <button className="hint-search-btn">Em</button>
            <button className="hint-search-btn">Nha gia kim</button>
            <button className="hint-search-btn">Tam hon</button>
            <button className="hint-search-btn">Tinh yeu</button>
            <button className="hint-search-btn">Tuoi tre</button>
            <button className="hint-search-btn">Cau vong</button> */}
            {add.map((history) =>
              history ? (
                <button
                  className="hint-search-btn"
                  onClick={() => setSearch(`${history}`)}
                  key={add.indexOf(history)}
                >
                  {history}
                </button>
              ) : null
            )}
          </div>
        </div>
        <div className="widget_list"></div>
      </div>
    </div>
  );
}
