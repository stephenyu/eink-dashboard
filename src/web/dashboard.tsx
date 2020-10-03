import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import { DashboardProps as ServerData } from 'shared/types';
import { Calendar } from 'web/calendar/calendar';
import { WorldClock } from 'web/world_clock/world_clock';
import { Weather } from 'web/weather/weather';

const GlobalStyle = createGlobalStyle`
  body {
    width: 400px;
    height: 300px;
    font-size: 18px;
    display: flex;
    padding: 8px;
    margin: 0px;
    justify-content: space-evenly;
    font-family: sans-serif;
  }
`;

type DashboardProps = {
  data: ServerData;
};

export const Dashboard = ({ data }: DashboardProps) => {
  const { timezones, weather } = data;
  return <>
    <GlobalStyle />
    <div>
      <Calendar />
    </div>
    <div>
      <WorldClock timezones={timezones}/>
      <Weather data={weather}/>
    </div>
  </>;
};
