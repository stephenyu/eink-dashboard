import * as React from 'react';
import styled from 'styled-components';
import { WeatherEntry } from 'shared/types';

const StyledWeather = styled.div`
  margin-top: 8px;
  font-size: .8em;
`;

type WeatherProps = {
  data: WeatherEntry[][];
};

const ClockSymbols = ['9 AM','12 PM', '3 PM', '6 PM', '9 PM'];

export const Weather = ({ data }: WeatherProps) => {
  const today = data[0];

  return <StyledWeather>
    <table>
      <th></th>
      <th>°C</th>
      <th>&#9730;</th>
      {ClockSymbols.map((clockSymbol, index) => <tr key={index}><td><span dangerouslySetInnerHTML={{ __html: clockSymbol }} /></td><td>{today[index].temp}°C</td><td>{today[index].chanceOfRain}%</td></tr>)}
    </table>
  </StyledWeather>;
};
