import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { Card } from "@material-ui/core";
import { LocalStorageOptions, getStoredOptions } from "../utils/storage";
import WeatherCard from "../components/WeatherCard";
import { Message } from "../utils/messages";
import "./contentScript.css";

const ContentScript: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    getStoredOptions().then((storedOptions) => {
      setOptions(storedOptions);
      setIsActive(storedOptions?.hasAutoOverlay);
    });
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg === Message.TOGGLE_OVERLAY) {
        setIsActive((prevStatus) => !prevStatus);
      }
      if (msg === Message?.TOGGLE_TEMPSCALE) {
        setOptions((prevOptions) => ({
          ...prevOptions,
          tempScale:
            prevOptions?.tempScale === "metric" ? "imperial" : "metric",
        }));
      }
    });
  }, []);

  if (!options?.homeCity) return null;
  return (
    <React.Fragment>
      {isActive ? (
        <Card className="overlayCard">
          <WeatherCard
            city={options?.homeCity}
            tempScale={options?.tempScale}
            onDelete={() => setIsActive(false)}
          />
        </Card>
      ) : null}
    </React.Fragment>
  );
};

const container = document.createElement("div");
document.body.appendChild(container);
render(<ContentScript />, container);

export default ContentScript;
