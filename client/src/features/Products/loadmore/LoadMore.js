import { Pagination } from "@mui/material";
import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import "./loadmore.css";

export default function LoadMore() {
  const state = useContext(GlobalState);
  const [page, setPage] = state.productsApi.page;
  // const [products] = state.productsApi.products;
  const [countPage] = state.productsApi.countPage;
  const scrollToTop = () => {
    window.scrollTo({
      top: 587,
      behavior: "smooth",
    });
  };
  const handlePageChange = (event, value) => {
    scrollToTop();
    setPage(value);
  };
  return (
    <>
      <div className="load_more">
        <div className="pagination">
          <Pagination
            count={countPage}
            siblingCount={2}
            boundaryCount={2}
            color="primary"
            shape="rounded"
            page={page}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}
