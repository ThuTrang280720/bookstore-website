import React from "react";
import "./helicoptership.css";

export default function HelicopterShip() {
  return (
    <div className="helicopter">
      <div className="cockpit"></div>
      <div className="tail">
        <span className="tail-title">CHUANG EXPRESS</span>
        <img
          src="https://res.cloudinary.com/chuanluu/image/upload/v1638703429/test/logo_hlslof.png"
          alt=""
        />
        <div className="tail-rotor">
          <div className="tail-rotator">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <div className="main"></div>
      <div className="rotor">
        <div className="rotator">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
