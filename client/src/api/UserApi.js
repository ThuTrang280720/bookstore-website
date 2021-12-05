// import axios from "axios";
import axiosClient from "./ClientAxiosApi";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserApi(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [infor, setInfor] = useState([]);
  const [inforAll, setInforAll] = useState([]);
  const [givenName, setGivenName] = useState([]);
  const [cart, setCart] = useState([]);
  const [orderInfo, setOrderInfo] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [callback, setCallback] = useState(false);

  //filter
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);
  const [countPage, setCountPage] = useState(1);
  const [totalResult, setTotalResult] = useState(0);
  const [role, setRole] = useState(-1);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          document.body.classList.add("loading-data");
          console.log(token);
          const res = await axiosClient.get("/user/infor", {
            headers: { Authorization: token },
          });
          setIsLogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
          setInfor(res.data);
          setGivenName(res.data.name.split(" ").pop());
          setCart(res.data.cart);
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
        const getAllUsers = async () => {
          try {
            document.body.classList.add("loading-data");
            const res = await axiosClient.get(
              `/user/all_infor?limit=${limit}&page=${page}&${role}&${sort}&email[regex]=${search}`,
              {
                headers: { Authorization: token },
              }
            );
            if (res && res.data) {
              setInforAll(res.data.users);
              setCountPage(Math.ceil(res.data.totalResult / limit));
              setResult(res.data.result);
              setTotalResult(res.data.totalResult);
            }
          } catch (err) {
            toast.error(err.response.data.msg);
            console.log(err);
          }
          document.body.classList.remove("loading-data");
        };
        getAllUsers();
      }
    }
  }, [token, isAdmin, callback, limit, page, sort, search, role]);

  const addCart = async (product, qtyAmount) => {
    if (!isLogged) return toast.warn("Login join with us and shopping");

    const check = cart.every((item) => {
      return item._id !== product._id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: qtyAmount }]);
      const result = await axiosClient.patch(
        "/user/addtocart",
        { cart: [...cart, { ...product, quantity: qtyAmount }] },
        {
          headers: { Authorization: token },
        }
      );
      toast.success(result.data.msg);
    } else {
      toast.warn("This product has beed added to cart");
    }
  };

  useEffect(() => {
    if (token) {
      const getOrderInfo = async () => {
        const result = await axiosClient.get("/user/order_infor", {
          headers: { Authorization: token },
        });
        setOrderInfo(result.data);
      };
      getOrderInfo();
    }
  }, [token, callback]);

  useEffect(() => {
    if (token) {
      if (isAdmin) {
        const getOrderList = async () => {
          const result = await axiosClient.get("/api/order", {
            headers: { Authorization: token },
          });
          setOrderList(result.data);
        };
        getOrderList();
      }
    }
  }, [token, callback, isAdmin]);

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    infor: [infor, setInfor],
    inforAll: [inforAll, setInforAll],
    givenName: [givenName, setGivenName],
    cart: [cart, setCart],
    addCart: addCart,
    orderInfo: [orderInfo, setOrderInfo],
    orderList: [orderList, setOrderList],
    callback: [callback, setCallback],
    limit: [limit, setLimit],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
    totalResult: [totalResult, setTotalResult],
    countPage: [countPage, setCountPage],
    role: [role, setRole],
  };
}

export default UserApi;
