import { useState, useEffect } from "react";
import axios from "axios";
function ProductsApi() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [result, setResult] = useState(0);
  const [totalResult, setTotalResult] = useState(0);
  const [countPage, setCountPage] = useState(1);
  const [startPrice, setStartPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(1e3);

  const [loadSklt, setLoadSklt] = useState(false);

  //homepage
  const [newProductHome, setNewProductHome] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      setLoadSklt(true);
      document.body.classList.add("loading-data");
      const totalRes = await axios.get(`/api/products`);
      const res = await axios.get(
        `/api/products?limit=${limit}&page=${page}&${category}&${sort}&title[regex]=${search}&price[gte]=${startPrice}&price[lte]=${endPrice}`
      );
      setLoadSklt(false);
      setProducts(res.data.products);
      setResult(res.data.result);
      setTotalResult(res.data.totalResult);
      setAllProducts(totalRes.data.products);
      setCountPage(Math.ceil(res.data.totalResult / limit));
      document.body.classList.remove("loading-data");
      console.log(res);
    };
    getProducts();
  }, [callback, limit, category, sort, page, search, startPrice, endPrice]);
  useEffect(() => {
    const getNewProduct = async () => {
      const res = await axios.get(`/api/products?limit=3`);
      setNewProductHome(res.data.products);
    };
    getNewProduct();
  }, []);
  return {
    products: [products, setProducts],
    allProducts: [allProducts, setAllProducts],
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
    //homepage
    newProductHome: [newProductHome, setNewProductHome],
    //filter price
    startPrice: [startPrice, setStartPrice],
    endPrice: [endPrice, setEndPrice],
  };
}

export default ProductsApi;
