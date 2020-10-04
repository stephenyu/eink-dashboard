export type Timezone = {
  timezone: string;
  label: string;
};

export type WeatherEntry = {
  temp: string;
  chanceOfRain: string;
};

export type Weather = WeatherEntry[];

export interface DashboardProps {
  weather: Weather[];
  timezones: Timezone[];
}
