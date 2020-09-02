import * as https from 'https';
import * as http from 'http';
import { DashboardProps } from 'shared/types';

const timezones = [
  { timezone: 'Australia/Sydney', label: 'Sydney' },
  { timezone: 'Canada/Eastern', label: 'Ottawa' },
  { timezone: 'Europe/London', label: 'London' },
];

const weatherLocation = "Glebe,Sydney";

async function getWeather(location: string) {
  const wttrData = await getWeatherData(location);
  const currentHour = new Date().getHours();

  const structureWttrData = wttrData.weather.reduce<Record<string, WttrHourlyWeather[]>>((weatherCollection, daily) =>
    ({ ...weatherCollection, [daily.date]: daily.hourly.map(hourly => hourly) }), {});

}

interface WttrHourlyWeather {
  FeelsLikeC: string;
  tempC: string;
  time: string;
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

  return Promise.resolve(
    {
      timezones,
      weather: [{ name: 'Sydney', celsius: 15.9 }],
    }
  );
}
