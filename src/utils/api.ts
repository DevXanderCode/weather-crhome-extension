const OPEN_WEATHER_API_KEY = "0fd5c3dfae61e3978e62cf9c009149d9";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

export type OpenWeatherTempScale = "metric" | "imperial";

export interface OpenWeatherData {
  name: string;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
  wind: {
    deg: number;
    speed: number;
  };
}

export async function fetchOpenWeatherData(
  city: string,
  tempScale: OpenWeatherTempScale
): Promise<OpenWeatherData> {
  const res = await fetch(
    `${BASE_URL}weather?q=${city}&units=${tempScale}&APPID=${OPEN_WEATHER_API_KEY}`
  );

  if (!res?.ok) {
    throw new Error("City not found");
  }

  return await res.json();
}
