import * as React from 'react';
import styled from 'styled-components';
import { Timezone } from 'shared/types';

function getTimeInTimezone(timeZone: string) {
  const date = new Date();
  date.setHours(date.getMinutes() > 30 ? date.getHours() + 1 : date.getHours());

  const options = {
    timeZone,
    hour: 'numeric',
    dayPeriod: 'short'
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
}

const StyledWorldClockItem = styled.tr`
  border-bottom: 1px solid #000;
`;

const StyledWorldClockCell = styled.td<{border: boolean}>`
  ${props => props.border ? 'border-bottom: 1px solid #000;' : ''}
  padding: 2px;
`;

const StyledWorldClock = styled.table`
    height: max-content;
    border: 1px solid #000;
    border-radius: 8px;
`;

export const WorldClock = ({ timezones } : {timezones: Timezone[]}) => {
  const elements = timezones.map(({ timezone, label }, index) => {
    const time = getTimeInTimezone(timezone);
    const border = index !== (timezones.length - 1);
    return <StyledWorldClockItem key={index}>
      <StyledWorldClockCell border={border}>{label}</StyledWorldClockCell><StyledWorldClockCell border={border}>{time}</StyledWorldClockCell>
    </StyledWorldClockItem>;
  });

  return <StyledWorldClock cellSpacing="0">{elements}</StyledWorldClock>;
};
