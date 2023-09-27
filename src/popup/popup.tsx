import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Paper, InputBase, IconButton, Box, Grid } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import "fontsource-roboto";
import "./popup.css";
import WeatherCard from "../components/WeatherCard";
import { getStoredCities, setStoredCities } from "../utils/storage";

const App: React.FC<{}> = () => {
  const [cities, setCites] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>("");

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

  useEffect(() => {
    getStoredCities().then((cities) => {
      setCites(cities);
    });
  }, []);

  return (
    <Box mx="8px" my="16px">
      <Grid container>
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
      </Grid>
      {cities?.map((city, index) => (
        <WeatherCard
          city={city}
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
