import React, { FC, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CardActions,
  Button,
} from "@material-ui/core";
import { fetchOpenWeatherData, OpenWeatherData } from "../../utils/api";
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
              Delete
            </Button>
          </CardActions>
        ) : null}
      </Card>
    </Box>
  );
};

const WeatherCard: FC<{ city: string; onDelete?: () => void }> = ({
  city,
  onDelete,
}) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null);
  const [cardState, setCardState] = useState<WeatherCardState>("loading");

  useEffect(() => {
    fetchOpenWeatherData(city)
      .then((data) => {
        console.log("Logging weather data", JSON.stringify(data, null, 2));
        setWeatherData(data);
        setCardState("ready");
      })
      .catch((err) => {
        console.log("logging weather error", err);
        setCardState("error");
      });
  }, [city]);

  if (cardState === "loading" || cardState === "error")
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography variant="body1">
          {cardState === "loading"
            ? "Loading..."
            : "Error: could not retrive the weather condition for this city"}
        </Typography>
      </WeatherCardContainer>
    );

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Typography variant="h5">{weatherData?.name}</Typography>
      <Typography variant="body1">
        {Math.round(weatherData?.main?.temp)}
      </Typography>
      <Typography variant="body1">
        Feels like: {Math.round(weatherData?.main?.feels_like)}
      </Typography>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
