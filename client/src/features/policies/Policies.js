import React from "react";
import Sidebar from "./Sidebar";
import Secure from "./mainpage/Secure";
import "./policies.css";

export default function Policies() {
  return (
    <div className="policies-page">
      <div className="container">
        {/* <div class="row">
          <div class="span12 ">
            <div class="breadcrumbs-wap" id="breadcrumbs_186">
              <ul class="breadcrumbs clearfix" itemprop="breadcrumb">
                <li>
                  <a href="https://bookstore-ecommerce-beta.herokuapp.com/">
                    <span itemprop="title">Trang chủ</span>
                  </a>
                </li>
                <li>
                  <i class="icon-right-open-thin"></i>
                  <a
                    itemprop="url"
                    href="https://www.vinabook.com/tro-giup.html"
                  >
                    <span itemprop="title">Trợ giúp</span>
                  </a>
                </li>
                <li>
                  <i class="icon-right-open-thin"></i>
                  <span itemprop="title">Chính sách bảo mật</span>
                </li>
              </ul>
            </div>
          </div>
        </div> */}
        <div className="main-policies">
          <div className="sidebar-policies">
            <Sidebar />
          </div>
          <div className="content-policies">
            <Secure />
          </div>
        </div>
      </div>
    </div>
  );
}
