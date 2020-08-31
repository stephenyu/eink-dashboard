export type Timezone = {
  timezone: string;
  label: string;
};

export type Weather = {
  name: string;
  celsius: number;
};

export interface DashboardProps {
  weather: Weather[];
  timezones: Timezone[];
}
