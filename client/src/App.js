import React, { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalState } from "./GlobalState";

import { Switch, Route } from "react-router-dom";

import Header from "./components/headers/Header";
import Home from "./features/HomePage/Home";
import Product from "./features/Products/Products";
import Auth from "./features/auth/Auth";
import Cart from "./features/cart/Cart";

import DetailProduct from "./features/Products/detailProduct/DetailProduct";
import Infor from "./features/infor/Infor";
import AdminPage from "./features/adminpage/AdminPage";
import ActivationEmail from "./features/auth/Activation";
import ForgotPass from "./features/auth/ForgotPass";
import ResetPass from "./features/auth/ResetPass";
import NotFound from "./utils/notfound/NotFound";
import UserList from "./features/adminpage/features/userlist/UserList";
import Policies from "./features/policies/Policies";

function App() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userApi.isLogged;
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/products" exact component={Product} />
          <Route path="/auth" exact component={Auth} />
          <Route
            path="/user/activate/:activationtoken"
            exact
            component={ActivationEmail}
          />
          <Route path="/forgot" exact component={ForgotPass} />
          <Route path="/user/reset/:token" exact component={ResetPass} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/detail/:id" exact component={DetailProduct} />

          <Route path="/admin" component={AdminPage} />
          <Route path="/admin/userlist" exact component={UserList} />
          <Route path="/infor" exact component={isLogged ? Infor : NotFound} />
          <Route path="/policies" exact component={Policies} />
          <Route path="/*" exact component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
