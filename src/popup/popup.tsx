import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Paper, InputBase, IconButton, Box, Grid } from "@material-ui/core";
import {
  Add as AddIcon,
  PictureInPicture as PictureInPictureIcon,
} from "@material-ui/icons";
import "fontsource-roboto";
import "./popup.css";
import WeatherCard from "../components/WeatherCard";
import {
  LocalStorageOptions,
  getStoredCities,
  getStoredOptions,
  setStoredCities,
  setStoredOptions,
} from "../utils/storage";
import { Message } from "../utils/messages";

const App: React.FC<{}> = () => {
  const [cities, setCites] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>("");
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);

  const handleCityButtonClick = () => {
    if (!cityInput) {
      return;
    }
    const updatedCities = [...cities, cityInput];
    setStoredCities(updatedCities).then(() => {
      setCites((prevCities) => [...prevCities, cityInput]);
      setCityInput("");
    });
  };

  const handleCityDeleteButtonClick = (index: number) => {
    cities?.splice(index, 1);
    const updatedCities = [...cities];
    setStoredCities(updatedCities).then(() => {
      setCites(updatedCities);
    });
  };

  const handleTempScaleButtonClick = () => {
    const updatedOptions: LocalStorageOptions = {
      ...options,
      tempScale: options?.tempScale === "metric" ? "imperial" : "metric",
    };

    setStoredOptions(updatedOptions).then(() => {
      setOptions(updatedOptions);
    });

    chrome.tabs.query({ active: true }, (tabs) => {
      if (tabs?.length > 0) {
        chrome.tabs.sendMessage(tabs[0]?.id, Message?.TOGGLE_TEMPSCALE);
      }
    });
  };

  const handleOverlayButtonClick = () => {
    chrome.tabs.query(
      {
        active: true,
      },
      (tabs) => {
        if (tabs?.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, Message?.TOGGLE_OVERLAY);
        }
      }
    );
  };

  useEffect(() => {
    getStoredCities().then((cities) => {
      setCites(cities);
    });
    getStoredOptions().then((options) => {
      setOptions(options);
    });
  }, []);

  if (!options) {
    return null;
  }

  return (
    <Box mx="8px" my="16px">
      <Grid container justify="space-evenly">
        <Grid item>
          <Paper>
            <Box px="15px" py="5px">
              <InputBase
                placeholder="Add a City Name"
                value={cityInput}
                onChange={(e) => setCityInput(e?.target?.value)}
              />
              <IconButton onClick={handleCityButtonClick}>
                <AddIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
        <Grid item>
          <Paper>
            <Box py="4px">
              <IconButton onClick={handleTempScaleButtonClick}>
                {options?.tempScale === "metric" ? "\u2103" : "\u2109"}
              </IconButton>
            </Box>
          </Paper>
        </Grid>
        <Grid item>
          <Paper>
            <Box py="4px">
              <IconButton onClick={handleOverlayButtonClick}>
                <PictureInPictureIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {options?.homeCity != "" && (
        <WeatherCard city={options?.homeCity} tempScale={options?.tempScale} />
      )}
      {cities?.map((city, index) => (
        <WeatherCard
          city={city}
          tempScale={options?.tempScale}
          key={`${city}-${index}`}
          onDelete={() => handleCityDeleteButtonClick(index)}
        />
      ))}
      <Box height="16px" />
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
