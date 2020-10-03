export type Timezone = {
  timezone: string;
  label: string;
};

export type Weather = string[];

export interface DashboardProps {
  weather: Weather[];
  timezones: Timezone[];
}
