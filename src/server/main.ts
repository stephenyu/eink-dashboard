import * as https from 'https';
import * as http from 'http';
import { DashboardProps, WeatherEntry } from 'shared/types';

const timezones = [
  { timezone: 'Australia/Sydney', label: 'Sydney' },
  { timezone: 'Canada/Eastern', label: 'Ottawa' },
  { timezone: 'Europe/London', label: 'London' },
];

const weatherLocation = "Glebe,Sydney";

function dailyEntryToCollection(entry:  WttrDaily) {
  console.log(entry);
  return entry.hourly.reduce<WeatherEntry[]>((collection, daily) => {
    const entryHour = parseInt(daily.time, 10) / 100;
    return (entryHour < 9)
      ? collection
      : [ ...collection, { temp: daily.FeelsLikeC, chanceOfRain: daily.chanceofrain }];
  }, []);
}

async function getWeather(location: string) {
  const wttrData = await getWeatherData(location);
  const weatherData = wttrData.weather.map(entry => dailyEntryToCollection(entry));
  return weatherData;
}

interface WttrHourlyWeather {
  FeelsLikeC: string;
  tempC: string;
  time: string;
  chanceofrain: string;
}

interface WttrDaily {
  date: string;
  hourly: WttrHourlyWeather[];
}

interface WttrWeather {
  weather: WttrDaily[]
}

async function getWeatherData(location: string): Promise<WttrWeather> {
  return new Promise(resolve => {
    const callback = (response: http.IncomingMessage) => {
      let body = "";
      response.on('data', c => body += c);
      response.on('end', () => resolve(JSON.parse(body)));
    };

    https.get('https://wttr.in/Glebe,Sydney?format=j1', callback);
  });
}

export async function getDashboardData(): Promise<DashboardProps> {
  const weatherData = await getWeather(weatherLocation);

  return {
    timezones,
    weather: weatherData
  };
}
