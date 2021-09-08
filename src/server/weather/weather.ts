import * as https from 'https';
import * as http from 'http';
import { WeatherEntry } from 'shared/types';

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

export async function getWeather(location: string) {
  const wttrData = await getWeatherData(location);
  const weatherData = wttrData.weather.map(entry => dailyEntryToCollection(entry));
  return weatherData;
}

function dailyEntryToCollection(entry:  WttrDaily) {
  return entry.hourly.reduce<WeatherEntry[]>((collection, daily) => {
    const entryHour = parseInt(daily.time, 10) / 100;
    return (entryHour < 9)
      ? collection
      : [ ...collection, { temp: daily.FeelsLikeC, chanceOfRain: daily.chanceofrain }];
  }, []);
}

async function getWeatherData(location: string): Promise<WttrWeather> {
  return new Promise(resolve => {
    const callback = (response: http.IncomingMessage) => {
      let body = "";
      response.on('data', c => body += c);
      response.on('end', () => resolve(JSON.parse(body)));
    };

    https.get(`https://wttr.in/${location}?format=j1`, callback);
  });
}

