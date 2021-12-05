import axiosClient from "./ClientAxiosApi";
import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export default function OrdersApi(token) {
  //   const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [callback, setCallback] = useState(false);
  const [orderList, setOrderList] = useState([]);
  //Filters
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [result, setResult] = useState(0);
  const [totalResult, setTotalResult] = useState(0);
  const [countPage, setCountPage] = useState(1);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          document.body.classList.add("loading-data");
          console.log(token);
          const res = await axiosClient.get("/user/infor", {
            headers: { Authorization: token },
          });
          //   setIsLogged(true);
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
        const getOrderList = async () => {
          const result = await axiosClient.get(
            `/api/order?limit=${limit}&page=${page}&${status}&${sort}&email[regex]=${search}`,
            {
              headers: { Authorization: token },
            }
          );
          setOrderList(result.data.orders);
          setCountPage(Math.ceil(result.data.totalResult / limit));
          setResult(result.data.result);
          setTotalResult(result.data.totalResult);
        };
        getOrderList();
      }
    }
  }, [token, callback, isAdmin, limit, page, status, sort, search]);

  return {
    orderList: [orderList, setOrderList],
    callback: [callback, setCallback],
    status: [status, setStatus],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    limit: [limit, setLimit],
    result: [result, setResult],
    totalResult: [totalResult, setTotalResult],
    countPage: [countPage, setCountPage],
  };
}
