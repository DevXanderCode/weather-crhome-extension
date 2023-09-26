import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./popup.css";
import WeatherCard from "../components/WeatherCard";

const App: React.FC<{}> = () => {
  return (
    <div>
      <WeatherCard city="Nigeria" />
    </div>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
