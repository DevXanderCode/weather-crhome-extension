import React, { FC, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CardActions,
  Button,
  Grid,
} from "@material-ui/core";
import {
  getWeatherIconSrc,
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
            : "Error: could not retrieve the weather condition for this city"}
        </Typography>
      </WeatherCardContainer>
    );

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Grid container justify="space-around">
        <Grid item>
          <Typography className="weatherCard-title">
            {weatherData?.name}
          </Typography>
          <Typography className="weatherCard-temp">
            {Math.round(weatherData?.main?.temp)}
          </Typography>
          <Typography className="weatherCard-body">
            Feels like {Math.round(weatherData?.main?.feels_like)}
          </Typography>
        </Grid>
        <Grid item>
          {weatherData?.weather?.length > 0 && (
            <React.Fragment>
              <img
                src={getWeatherIconSrc(weatherData?.weather[0]?.icon)}
                alt={weatherData?.weather[0].description}
              />
              <Typography className="weatherCard-body">
                {weatherData?.weather[0]?.main}
              </Typography>
            </React.Fragment>
          )}
        </Grid>
      </Grid>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
