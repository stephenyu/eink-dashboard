import * as React from 'react';
import styled from 'styled-components';

const StyledWeather = styled.div`
margin-top: 8px;
`;

type WeatherProps = {
  data: string[][];
};

const DayOfTheWeatherAbbreviations = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const ClockSymbols = ['&#128344;','&#128347;', '&#128338;', '&#128341;', '&#128344;'];

export const Weather = ({ data }: WeatherProps) => {
  const todayDate = new Date();
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);

  const today = data[0];
  const tomorrow = data[1];

  return <StyledWeather>
    <table>
      <th></th>
      <th>{DayOfTheWeatherAbbreviations[todayDate.getDay()]}</th>
      <th>{DayOfTheWeatherAbbreviations[tomorrowDate.getDay()]}</th>
      {ClockSymbols.map((clockSymbol, index) => <tr key={index}><td><span dangerouslySetInnerHTML={{ __html: clockSymbol }} /></td><td>{today[index]}°C</td><td>{tomorrow[index]}°C</td></tr>)}
    </table>
  </StyledWeather>;
};
