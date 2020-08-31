import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

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
`

const StyledTD = styled.td<{today: boolean}>`
    width: 18px;
    height: 18px;
    text-align: center;
    ${props => {
    if (props.today) {
      return "border: 2px solid #000; border-radius: 50%;";
    }
  }}
`;

const StyledCalendarHeading = styled.span`
  text-align: center;
`

const StyledCalendarDateHeading = styled.th`
  text-decoration: italic;
`

const StyledCalendar = styled.div`
  text-align: center;
`

const Calendar = () => {
  const date = new Date();
  const todaysDate = date.getDate();

  const options = {
    month: 'long',
    year: 'numeric'
  };

  const monthHeading = new Intl.DateTimeFormat('en-US', options).format(date);

  const tableBody = (() => {
    const date = new Date();
    date.setDate(1);
    const currentMonth = date.getMonth();

    const body = [];
    let trElements = [];

    for(let i = date.getDay(); i > 0; i--) {
      trElements.push(<StyledTD today={false}/>);
    }

    while(date.getMonth() === currentMonth) {
      const tdElement = <StyledTD today={date.getDate() === todaysDate}>{date.getDate()}</StyledTD>;
      trElements.push(tdElement);

      date.setDate(date.getDate() + 1);
      if (date.getDay() === 0) {
        body.push(trElements);
        trElements = [];
      }
    }

    body.push(trElements);

    return body;
  })();

  return <StyledCalendar>
      <StyledCalendarHeading>{monthHeading}</StyledCalendarHeading>
    <table>
      <thead>
        <tr>
          <StyledCalendarDateHeading>Su</StyledCalendarDateHeading>
          <StyledCalendarDateHeading>Mo</StyledCalendarDateHeading>
          <StyledCalendarDateHeading>Tu</StyledCalendarDateHeading>
          <StyledCalendarDateHeading>We</StyledCalendarDateHeading>
          <StyledCalendarDateHeading>Th</StyledCalendarDateHeading>
          <StyledCalendarDateHeading>Fr</StyledCalendarDateHeading>
          <StyledCalendarDateHeading>Sa</StyledCalendarDateHeading>
        </tr>
      </thead>
      <tbody>
        {tableBody.map((row, i) => <tr key={i}>{row}</tr>)}
      </tbody>
    </table>
  </StyledCalendar>;
};

type Timezone = {
    timezone: string;
    label: string;
}

function getTimeInTimezone(timeZone: string) {
    const date = new Date();
    date.setHours(date.getMinutes() > 30 ? date.getHours() + 1 : date.getHours());

    const options = {
        timeZone,
        hour: 'numeric',
        dayPeriod: 'short'
    };

    return new Intl.DateTimeFormat('en-US', options).format(date)
}

const StyledWorldClockItem = styled.tr`
  border-bottom: 1px solid #000;
`

const StyledWorldClockCell = styled.td<{border: boolean}>`
  ${props => props.border ? 'border-bottom: 1px solid #000;' : ''}
  padding: 2px;
`

const StyledWorldClock = styled.table`
    height: max-content;
    border: 1px solid #000;
    border-radius: 8px;
`

const WorldClock = ({timezones} : {timezones: Timezone[]}) => {
    const elements = timezones.map(({ timezone, label }, index) => {
        const time = getTimeInTimezone(timezone);
        const border = index !== (timezones.length - 1);
        return <StyledWorldClockItem>
            <StyledWorldClockCell border={border}>{label}</StyledWorldClockCell><StyledWorldClockCell border={border}>{time}</StyledWorldClockCell>
        </StyledWorldClockItem>;
    });

    return <StyledWorldClock cellSpacing="0">{elements}</StyledWorldClock>
};

const timezones = [
  { timezone: 'Australia/Sydney', label: 'Sydney' },
  { timezone: 'Canada/Eastern', label: 'Ottawa' },
  { timezone: 'Europe/London', label: 'London' },
];

export const Dashboard = () => <>
  <GlobalStyle />
  <Calendar />
  <WorldClock timezones={timezones}/>
</>;
