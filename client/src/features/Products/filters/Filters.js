import {
  Apps,
  Loyalty,
  Search,
  ViewList,
  Mic,
  MicOff,
} from "@mui/icons-material";
import React, { useContext, useRef, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import ProTypes from "prop-types";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResult = true;
mic.lang = "vi-VN";
Filters.propTypes = {
  onSubmit: ProTypes.func,
};
Filters.defaultProps = {
  onSubmit: null,
};
function Filters(props) {
  const { onSubmit } = props;
  const state = useContext(GlobalState);
  //const [categories] = state.categoriesApi.categories;
  //const [products, setProducts] = state.productsApi.products;
  //const [, setCategory] = state.productsApi.category;
  const [sort, setSort] = state.productsApi.sort;
  const [result] = state.productsApi.result;
  const [search] = state.productsApi.search;
  const [searchFT, setSearchFT] = useState("");
  const [isListen, setIsListen] = useState(false);
  const typingTimeOutRef = useRef(null);

  // const handleCategory = (e) => {
  //   setCategory(e.target.value);
  //   setSearch("");
  // };
  const handleSearchChange = (e) => {
    // if (e.target.value) {
    setSearchFT(e.target.value);
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
      const formValues = {
        searchFT: e.target.value,
      };
      onSubmit(formValues);
    }, 1500);
    // }
  };

  useEffect(() => {
    handleListen();
    // eslint-disable-next-line
  }, [isListen]);

  const handleListen = () => {
    if (isListen) {
      mic.start();
      mic.onend = () => {
        console.log("we are listening you...");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("On the mic");
    };
    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      console.log(transcript);
      setSearchFT(transcript);
      if (typingTimeOutRef.current) {
        clearTimeout(typingTimeOutRef.current);
      }
      typingTimeOutRef.current = setTimeout(() => {
        const formValues = {
          searchFT: transcript,
        };
        onSubmit(formValues);
      }, 1500);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };
  const handleChangeMic = () => {
    if (isListen) {
      setIsListen((prevState) => !prevState);
    } else {
      setIsListen((prevState) => !prevState);
      setSearchFT("");
    }
  };

  return (
    <>
      {/* <div className="filters">
        <ul>
          <li className="active" data-filter="*">
            All Products
          </li>
          <li data-filter=".des">Featured</li>
          <li data-filter=".dev">Flash Deals</li>
          <li data-filter=".gra">Last Minute</li>
        </ul>
      </div> */}
      <div className="filters">
        <div className="filter-menu ">
          <div className="row">
            {/* <span>Categories: </span>
            <select name="category" value={category} onChange={handleCategory}>
              <option value="">All Product</option>
              {categories.map((category) => (
                <option value={"category=" + category.name} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select> */}
            <Apps />
            <ViewList />
          </div>
          <div className="search_input">
            {isListen ? (
              <MicOff onClick={() => handleChangeMic()} />
            ) : (
              <Mic onClick={() => handleChangeMic()} />
            )}

            <Search />
            <input
              type="text"
              value={searchFT}
              placeholder={isListen ? "Talk to search..." : "Enter your search"}
              onChange={(e) => handleSearchChange(e)}
            />
          </div>
          <div className="search_input">
            <span>Sort By: </span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="">Newest</option>
              <option value="sort=oldest">Oldest</option>
              <option value="sort=-sold">Best Seller</option>
              <option value="sort=-price">Price: Hight-Low</option>
              <option value="sort=price">Price: Low-Hight</option>
            </select>
          </div>
        </div>
        <div className="hastag-sort">
          <div className="hastag-tag">
            <div className="tag-title">
              <Loyalty />
              <i>Tags</i>
            </div>
            <div className="tag-content">
              <span onClick={() => setSort("")}>New product</span>
              <span onClick={() => setSort("sort=-sold")}>Top Sale</span>
              <span onClick={() => setSort("sort=price")}>Inexpensive</span>
              <span onClick={() => setSort("sort=-price")}>Expensive</span>
            </div>
          </div>
          {search ? (
            <div className="search-result">
              <i>
                "{search}" match ({result})
              </i>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Filters;
