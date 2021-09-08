import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import { DashboardProps as ServerData } from 'shared/types';
import { Calendar } from 'web/calendar/calendar';
import { WorldClock } from 'web/world_clock/world_clock';
import { Weather } from 'web/weather/weather';
import { NewsPanel } from 'web/news/news';
import styled from 'styled-components';

type DashboardProps = {
  data: ServerData;
};

const TopDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

const BottomDiv = styled.div`
  margin-top: 4px;
`;

const GlobalStyle = createGlobalStyle`
  body {
    width: 400px;
    height: 300px;
    font-size: 18px;
    padding: 8px;
    margin: 0px;
    font-family: sans-serif;
  }
`;

export const Dashboard = ({ data }: DashboardProps) => {
  const { timezones, weather, news } = data;
  return <>
    <GlobalStyle />
    <TopDiv>
      <div>
        <Calendar />
      </div>
      <div>
        <WorldClock timezones={timezones}/>
        <Weather data={weather}/>
      </div>
    </TopDiv>
    <BottomDiv>
      <NewsPanel news={news}/>
    </BottomDiv>
  </>;
};
