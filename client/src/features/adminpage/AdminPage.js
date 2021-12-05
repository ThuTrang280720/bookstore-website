import React, { useContext } from "react";
import "./adminpage.css";
import SideBar from "./sidebar/SideBar";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

import { GlobalState } from "../../GlobalState";
import UserList from "./features/userlist/UserList";
import ProductListAdmin from "./features/productlist/ProductListAdmin";
import UserDetail from "./features/userdetail/UserDetail";
import CreateUser from "./features/createUser/CreateUser";
import OrderList from "./features/orderlist/OrderList";
import OrderDetailAdmin from "./features/orderdetail/OrderDetailAdmin";
import CategoriesList from "./features/categorylist/CategoriesList";
import ProductDetail from "./features/productdetail/ProductDetail";
import CreateProduct from "./features/createproduct/CreateProduct";
import Product from "../Products/Products";
function AdminPage() {
  const state = useContext(GlobalState);
  //const [isLogged, setIsLogged] = state.userApi.isLogged;
  const [isAdmin] = state.userApi.isAdmin;

  return (
    <div className="admin-page" id="admin-page">
      {isAdmin ? (
        <Router>
          <div className="container-ad">
            <SideBar />
            <div className="others">
              <Switch>
                <Route path="/admin/userlist" exact component={UserList} />
                <Route
                  path="/admin/userdetail/:id"
                  exact
                  component={UserDetail}
                />
                <Route path="/admin/createUser" exact component={CreateUser} />
                <Route
                  path="/admin/createproduct"
                  exact
                  component={CreateProduct}
                />
                <Route
                  path="/admin/productlist"
                  exact
                  component={ProductListAdmin}
                />
                <Route
                  path="/admin/productdetail/:id"
                  exact
                  component={ProductDetail}
                />
                <Route path="/admin/orderlist" exact component={OrderList} />
                <Route
                  path="/admin/orderlistdetail/:id"
                  exact
                  component={OrderDetailAdmin}
                />
                <Route
                  path="/admin/categorieslist"
                  exact
                  component={CategoriesList}
                />
                <Route path="/admin/products" exact component={Product} />
              </Switch>
            </div>
          </div>
        </Router>
      ) : (
        <div className="container-ad">
          <h1>This is Admin system. Please go back, thanks you!</h1>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
