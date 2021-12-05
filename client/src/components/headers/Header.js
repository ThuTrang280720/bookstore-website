import React, { useContext, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import {
  AccountCircleOutlined,
  NotificationImportantOutlined,
  SearchOutlined,
  ShoppingCart,
} from "@material-ui/icons";
import ListIcon from "@mui/icons-material/List";
import Logo from "./images/logo.png";
import Modal from "react-modal";
import FormAuth from "../../features/auth/Auth";
import withLoading from "../../utils/loading/withLoading";

Modal.setAppElement(document.getElementById("root"));
const customStyles1 = {
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    border: "none",
    zIndex: "999",
  },
  content: {
    top: "375px",
    overflow: "unset",
    border: "none",
    background: "transparent",
    height: "auto",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Header(props) {
  const history = useHistory();
  const state = useContext(GlobalState);
  const [givenName] = state.userApi.givenName;
  const [isLogged, setIsLogged] = state.userApi.isLogged;
  const [isAdmin, setIsAdmin] = state.userApi.isAdmin;
  const [cart] = state.userApi.cart;
  const [, setSearch] = state.productsApi.search;
  const [, setCategory] = state.productsApi.category;
  const [searchInp, setSearchInp] = useState("");
  const [categories] = state.categoriesApi.categories;
  const [categoryInp, setCategoryInp] = useState("");
  const [, setPage] = state.productsApi.page;

  // const adminRouter = () => {
  //   return (
  //     <>
  //       <li className="nav-item">
  //         <Link to="/admin" className="nav-link">
  //           Admin Panel
  //         </Link>
  //       </li>
  //       <li className="nav-item">
  //         <Link to="/" className="nav-link" onClick={logoutUser}>
  //           Logout
  //         </Link>
  //       </li>
  //     </>
  //   );
  // };

  // const loggedRouter = () => {
  //   return (
  //     <>
  //       <li className="nav-item">
  //         <NavLink to="/infor" className="nav-link" activeClassName="active">
  //           Profile
  //         </NavLink>
  //       </li>
  //       <li className="nav-item">
  //         <NavLink
  //           to="/"
  //           className="nav-link"
  //           activeClassName="active"
  //           onClick={logoutUser}
  //         >
  //           Logout
  //         </NavLink>
  //       </li>
  //     </>
  //   );
  // };
  const onChangeInput = (input) => {
    setSearchInp(input);
  };
  const handleCategory = (e) => {
    setCategoryInp(e.target.value);
  };
  const submitSearch = (e) => {
    e.preventDefault();
    setSearch(searchInp);
    setCategory("category=" + categoryInp);
    setPage(1);
    history.push("/products");
    handeleScroll(587);
  };

  const logoutUser = async () => {
    props.showLoading();
    await axios.get("/user/logout");
    localStorage.clear();
    toast.success("See you again ^^");
    // window.location.href = "/";
    setIsAdmin(false);
    setIsLogged(false);
    props.hideLoading();
  };

  const accountAdmin = () => {
    return (
      <>
        <Link to="/infor" className="auth_acc">
          <p>Admin</p>
          <p>Hi {givenName}</p>
        </Link>
      </>
    );
  };
  const accountUser = () => {
    return (
      <>
        <Link to="/infor" className="auth_acc">
          <p>Account</p>
          <p>Hi {givenName}</p>
        </Link>
      </>
    );
  };

  //modal auth
  //let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = "#f000";
  }

  function closeModal() {
    setIsOpen(false);
  }
  const handeleScroll = (x, y) => {
    window.scroll({
      top: x || 187,
      left: y || 0,
      behavior: "smooth",
    });
    console.log(123);
  };
  const handeleScrollHome = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {/* // <header> */}
      <div className="main_header">
        {/* <div class="header_top">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-7 col-md-7">
                <div class="welcome-text">
                  <p>Free Delivery: </p>
                </div>
              </div>
              <div class="col-lg-5 col-md-5">
                <div class="language_currency text-right">
                  <ul>
                    <li class="language">
                      English <i class="fa fa-angle-down"></i>
                      <ul class="dropdown_language">
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="header_middle">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-3 col-md-3 col-4">
                <div className="logo">
                  <Link to="#">
                    <img src={Logo} alt="" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-9 col-md-6 col-6">
                <div className="header_right_info">
                  <div className="search_container">
                    <form onSubmit={submitSearch} className="formsr">
                      <div className="hover_category">
                        <select
                          className="select_option"
                          name="category"
                          onChange={handleCategory}
                        >
                          <option value="">All Categories</option>
                          {categories.map((item) => (
                            <option value={item.name} key={item._id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="search_box">
                        <input
                          placeholder="Search product..."
                          type="text"
                          // value={search}
                          className="inp_search"
                          onChange={(e) => onChangeInput(e.target.value)}
                        />
                        <button type="submit">
                          <SearchOutlined />
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="header_account_area">
                    <div className="header_account-list top_links">
                      {isLogged && cart.length !== 0 ? (
                        <span className="count">{cart.length}</span>
                      ) : null}
                      <NotificationImportantOutlined className="icon-users" />
                      {isLogged && cart.length !== 0 ? (
                        <ul className="dropdown_links">
                          {cart.map((item) => (
                            <li key={item._id}>
                              <Link to="#">{item.product_id} </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                    <div className="header_account-list mini_cart_wrapper top_links">
                      {isLogged && cart.length !== 0 ? (
                        <span className="count">{cart.length}</span>
                      ) : null}
                      <ShoppingCart className="icon-users" />
                      {isLogged && cart.length !== 0 ? (
                        <ul className="dropdown_links">
                          {cart.map((item) => (
                            <li key={item._id}>
                              <Link to="#">{item.title} </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                    <div className="header_account-list header_wishlist top_links">
                      <div className="row">
                        <AccountCircleOutlined className="icon-users" />
                        <div className="col">
                          {isAdmin ? (
                            accountAdmin()
                          ) : isLogged ? (
                            accountUser()
                          ) : (
                            <Link
                              to="#"
                              className="auth_acc"
                              onClick={openModal}
                            >
                              <p>Login/Register</p>
                              <p>Account</p>
                            </Link>
                          )}
                        </div>
                        {isLogged ? (
                          <ul className="dropdown_links">
                            <li>
                              <Link to="/infor">Information</Link>
                            </li>
                            <li>
                              <Link to="/cart">Cart shopping</Link>
                            </li>
                            <li>
                              <Link to="/" onClick={logoutUser}>
                                Logout account
                              </Link>
                            </li>
                          </ul>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header_bottom">
        <div className="container sticky-header">
          <div className="row align-items-center">
            <div className="col-lg-3">
              <div className="categories_menu ">
                <div className="categories_title top_links1">
                  <ListIcon className="menu_cart_icon" />
                  <h2 className="categori_toggle">Categories</h2>

                  <ul className="dropdown_links1">
                    {categories.map((item) => (
                      <li key={item._id}>
                        <Link to="#">{item.name}</Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mega_menu top_links"></div>
                </div>
                <div className="categories_menu_toggle"></div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="main_menu menu_position">
                <nav>
                  <ul>
                    <li>
                      <NavLink
                        to="/"
                        className="nav-link"
                        exact
                        activeClassName="active"
                        onClick={handeleScrollHome}
                      >
                        home
                      </NavLink>
                    </li>
                    <li className="mega_items">
                      <NavLink
                        to="/products"
                        className="nav-link"
                        activeClassName="active"
                        onClick={() => handeleScroll()}
                      >
                        shop
                      </NavLink>
                    </li>
                    {isLogged ? (
                      <li>
                        <NavLink
                          to="/cart"
                          className="nav-link"
                          activeClassName="active"
                          onClick={() => handeleScroll()}
                        >
                          Cart
                        </NavLink>
                      </li>
                    ) : null}
                    {isAdmin ? (
                      <li>
                        <NavLink
                          to="/admin"
                          className="nav-link"
                          activeClassName="active"
                          href="#admin-page"
                          onClick={() => handeleScroll()}
                        >
                          Admin Panel
                        </NavLink>
                      </li>
                    ) : null}
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="call-support">
                <p>Call Support: 0123456789</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="header_bottom sticky-header"></div> */}
      {/* </header>  */}
      {/* Modal Login */}
      <div className="form-login-modal">
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles1}
          //portalClassName="modal"
          contentLabel="Example Modal"
        >
          <FormAuth closeModal={closeModal} />
        </Modal>
      </div>
    </>
  );
}

export default withLoading(Header);

// ass
// <nav className="navbar navbar-expand-lg">
//         <div className="container">
//           <Link to="/" className="navbar-brand">
//             <h2>
//               {isAdmin ? "Admin " : "Chuang "}
//               <em>{isAdmin ? "Management" : "Store"} </em>
//             </h2>
//           </Link>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-toggle="collapse"
//             data-target="#navbarResponsive"
//             aria-controls="navbarResponsive"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarResponsive">
//             <ul className="navbar-nav ml-auto">
//               <li className="nav-item">
//                 <NavLink
//                   to="/"
//                   className="nav-link"
//                   exact
//                   activeClassName="active"
//                 >
//                   Home
//                   <span className="sr-only">(current)</span>
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink
//                   to="/products"
//                   className="nav-link"
//                   activeClassName="active"
//                 >
//                   {isAdmin ? "Shop" : "Products"}
//                 </NavLink>
//               </li>

//               {isAdmin ? (
//                 adminRouter()
//               ) : isLogged ? (
//                 loggedRouter()
//               ) : (
//                 <li className="nav-item">
//                   <NavLink
//                     to="/auth"
//                     className="nav-link"
//                     activeClassName="active"
//                   >
//                     Login ⫘ Register
//                   </NavLink>
//                 </li>
//               )}
//               <li className="nav-item header-cart">
//                 <span className="count">{cart.length}</span>
//                 <NavLink
//                   to="/cart"
//                   className="nav-link"
//                   activeClassName="active"
//                 >
//                   {/* <img src={Cart} alt="" width="21"></img> */}
//                   <ShoppingCart />
//                 </NavLink>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
// sss
