import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Paper, InputBase, IconButton, Box, Grid } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import "fontsource-roboto";
import "./popup.css";
import WeatherCard from "../components/WeatherCard";

const App: React.FC<{}> = () => {
  const [cities, setCites] = useState<string[]>([
    "Nigeria",
    "Port Harcourt",
    "Lagos",
    "Error",
  ]);
  const [cityInput, setCityInput] = useState<string>("");

  const handleCityButtonClick = () => {
    if (!cityInput) {
      return;
    }
    setCites((prevCities) => [...prevCities, cityInput]);
    setCityInput("");
  };

  const handleCityDeleteButtonClick = (index: number) => {
    console.log("delete city", index);
    cities?.splice(index, 1);
    setCites([...cities]);
  };

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
