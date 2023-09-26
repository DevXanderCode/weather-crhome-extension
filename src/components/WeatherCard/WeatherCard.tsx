import React, { FC, useEffect } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { fetchOpenWeatherData } from "../../utils/api";
import "./WeatherCard.css";

const WeatherCard: FC<{ city: string }> = ({ city }) => {
  useEffect(() => {
    fetchOpenWeatherData("Nigeria")
      .then((data) =>
        console.log("Logging weather data", JSON.stringify(data, null, 2))
      )
      .catch((err) => {
        console.log("logging weather error", err);
      });
  }, []);
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{city}</Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
