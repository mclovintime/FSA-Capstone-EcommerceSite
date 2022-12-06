import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div id="wholeContainer">
      <video src="/videos/video1.mp4" autoPlay loop muted />
      <h1 className="header">DimTECH</h1>
      <h2 className="subheader">
        Products from tomorrow, <u>today!</u>
      </h2>
    </div>
  );
};

export default Home;
