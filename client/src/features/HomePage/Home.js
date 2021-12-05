import React from "react";
import Footers from "../../components/footers/Footers";
import Shipping from "../../components/shipping/Shipping";
import About from "./components/about/About";
import Banner from "./components/banners/Banner";
import Intro from "./components/intro/Intro";

// import About from "./components/about/About"
function Home() {
  return (
    <div>
      <Banner />
      <Intro />
      <About />
      <Shipping />
      <Footers />
    </div>
  );
}

export default Home;
