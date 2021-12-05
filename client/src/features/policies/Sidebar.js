import React from "react";

export default function Sidebar() {
  return (
    <div class="mainbox-simple mainbox2-container">
      <div class="mainbox2-title clearfix">
        <span>Danh mục pages</span>
      </div>
      <div class="mainbox2-body">
        <ul class="text-links">
          <li class="level-1">
            <a href="https://www.vinabook.com/gioi-thieu-cong-ty.html">
              Giới thiệu công ty
            </a>
          </li>
          <div id="page_tl_49" class="hidden" title="Giới thiệu công ty"></div>
          <li class="level-1">
            <a href="https://www.vinabook.com/goc-bao-chi.html">Góc báo chí</a>
          </li>
          <div id="page_tl_51" class="hidden" title="Góc báo chí"></div>
          <li class="level-1">
            <a href="https://www.vinabook.com/hop-tac-phat-hanh.html">
              Hợp tác Phát hành
            </a>
          </li>
          <div id="page_tl_52" class="hidden" title="Hợp tác Phát hành"></div>
          <li class="level-1">
            <a href="https://www.vinabook.com/tuyen-dung.html">Tuyển dụng</a>
          </li>
          <div id="page_tl_50" class="hidden" title="Tuyển dụng"></div>
        </ul>
      </div>{" "}
      <div class="mainbox2-bottom">
        <span>&nbsp;</span>
      </div>{" "}
    </div>
  );
}
