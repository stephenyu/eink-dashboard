import * as React from 'react';
import styled from 'styled-components';

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
`;

const StyledCalendarDateHeading = styled.th`
  text-decoration: italic;
`;

const StyledCalendar = styled.div`
  text-align: center;
`;

export const Calendar = () => {
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
