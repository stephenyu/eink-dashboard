import { DashboardProps } from 'shared/types';
import { getWeather } from 'server/weather/weather';
import { getSMHHeadline, getGuardianHeadline } from 'server/news/news';

const TIMEZONES = [
  { timezone: 'Australia/Sydney', label: 'Sydney' },
  { timezone: 'Canada/Eastern', label: 'Ottawa' },
  { timezone: 'Europe/London', label: 'London' },
];

const WEATHER_LOCATION = "Glebe,Sydney";

export async function getDashboardData(): Promise<DashboardProps> {
  const weatherData = await getWeather(WEATHER_LOCATION);
  const guardian = await getGuardianHeadline();
  const smh = await getSMHHeadline();

  return {
    timezones: TIMEZONES,
    weather: weatherData,
    news: {
      guardian, smh
    }
  };
}
