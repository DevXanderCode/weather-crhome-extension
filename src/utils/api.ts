const OPEN_WEATHER_API_KEY = "0fd5c3dfae61e3978e62cf9c009149d9";

export async function fetchOpenWeatherData(city: string): Promise<any> {
  const res = await fetch(``);

  if (!res?.ok) {
    throw new Error("City not found");
  }

  return await res.json();
}
