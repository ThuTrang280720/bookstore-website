import { useState, useEffect } from "react";
import axiosClient from "./ClientAxiosApi";

function ProductsApi(token) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [result, setResult] = useState(0);
  const [totalResult, setTotalResult] = useState(0);
  const [countPage, setCountPage] = useState(1);

  const [loadSklt, setLoadSklt] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 587,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          document.body.classList.add("loading-data");
          const res = await axiosClient.get("/user/infor", {
            headers: { Authorization: token },
          });
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
        } catch (err) {
          console.log(err.response.data.msg);
        }
        document.body.classList.remove("loading-data");
      };
      getUser();
    }
  }, [token]);
  useEffect(() => {
    if (token) {
      if (isAdmin) {
        const getProducts = async () => {
          setLoadSklt(true);
          document.body.classList.add("loading-data");
          const res = await axiosClient.get(
            `/api/products?limit=${limit}&page=${page}&${category}&${sort}&title[regex]=${search}`,
            { header: { Authorization: token } }
          );
          setLoadSklt(false);
          setProducts(res.data.products);

          setResult(res.data.result);
          setTotalResult(res.data.totalResult);
          setCountPage(Math.ceil(res.data.totalResult / limit));
          document.body.classList.remove("loading-data");
          scrollToTop();
        };
        getProducts();
      }
    }
  }, [callback, limit, category, sort, page, search, token, isAdmin]);

  useEffect(() => {
    if (token) {
      if (isAdmin) {
        const getAllProducts = async () => {
          document.body.classList.add("loading-data");
          const totalRes = await axiosClient.get(`/api/allproducts`, {
            headers: { Authorization: token },
          });
          setAllProducts(totalRes.data.allproducts);
          document.body.classList.remove("loading-data");
        };
        getAllProducts();
      }
    }
  }, [callback, token, isAdmin]);
  console.log(allProducts);
  return {
    allProducts: [allProducts, setAllProducts],
    products: [products, setProducts],
    callback: [callback, setCallback],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    limit: [limit, setLimit],
    result: [result, setResult],
    totalResult: [totalResult, setTotalResult],
    countPage: [countPage, setCountPage],
    //Skeleton
    loadSklt: [loadSklt, setLoadSklt],
  };
}

export default ProductsApi;
