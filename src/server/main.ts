import { DashboardProps } from 'shared/types';

const timezones = [
  { timezone: 'Australia/Sydney', label: 'Sydney' },
  { timezone: 'Canada/Eastern', label: 'Ottawa' },
  { timezone: 'Europe/London', label: 'London' },
  { timezone: 'Europe/Paris', label: 'Paris' },
];

export async function getDashboardData(): Promise<DashboardProps> {
  return Promise.resolve(
    {
      timezones,
      weather: [{ name: 'Sydney', celsius: 15.9 }],
    }
  );
}
