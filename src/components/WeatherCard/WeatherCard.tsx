import React, { FC, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CardActions,
  Button,
} from "@material-ui/core";
import {
  fetchOpenWeatherData,
  OpenWeatherData,
  OpenWeatherTempScale,
} from "../../utils/api";
import "./WeatherCard.css";

type WeatherCardState = "loading" | "error" | "ready";

const WeatherCardContainer: FC<{
  children: React.ReactNode;
  onDelete?: () => void;
}> = ({ children, onDelete }) => {
  return (
    <Box mx={"4px"} my={"16px"}>
      <Card>
        <CardContent>{children}</CardContent>
        {onDelete ? (
          <CardActions>
            <Button onClick={onDelete} color="secondary">
              <Typography className="weatherCard-body">Delete</Typography>
            </Button>
          </CardActions>
        ) : null}
      </Card>
    </Box>
  );
};

const WeatherCard: FC<{
  city: string;
  tempScale: OpenWeatherTempScale;
  onDelete?: () => void;
}> = ({ city, tempScale, onDelete }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null);
  const [cardState, setCardState] = useState<WeatherCardState>("loading");

  useEffect(() => {
    fetchOpenWeatherData(city, tempScale)
      .then((data) => {
        console.log("Logging weather data", JSON.stringify(data, null, 2));
        setWeatherData(data);
        setCardState("ready");
      })
      .catch((err) => {
        console.log("logging weather error", err);
        setCardState("error");
      });
  }, [city, tempScale]);

  if (cardState === "loading" || cardState === "error")
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography className="weatherCard-title">{city}</Typography>
        <Typography className="weatherCard-body">
          {cardState === "loading"
            ? "Loading..."
            : "Error: could not retrive the weather condition for this city"}
        </Typography>
      </WeatherCardContainer>
    );

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Typography className="weatherCard-title">{weatherData?.name}</Typography>
      <Typography className="weatherCard-body">
        {Math.round(weatherData?.main?.temp)}
      </Typography>
      <Typography className="weatherCard-body">
        Feels like: {Math.round(weatherData?.main?.feels_like)}
      </Typography>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
