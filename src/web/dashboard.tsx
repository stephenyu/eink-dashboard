import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import { DashboardProps as ServerData } from 'shared/types';
import { Calendar } from 'web/calendar/calendar';
import { WorldClock } from 'web/world_clock/world_clock';

const GlobalStyle = createGlobalStyle`
  body {
    width: 400px;
    height: 300px;
    font-size: 14px;
    display: flex;
    padding: 8px;
    margin: 0px;
    justify-content: space-evenly;
  }
`;

type DashboardProps = {
  data: ServerData;
};

export const Dashboard = ({ data }: DashboardProps) => {
  const { timezones } = data;
  return <>
    <GlobalStyle />
    <Calendar />
    <WorldClock timezones={timezones}/>
  </>;
};
