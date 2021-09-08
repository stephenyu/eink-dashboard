import * as React from 'react';
import styled from 'styled-components';

const StyledUl = styled.ul`
  margin: 0;
  padding: 0;
`;

const StyledOl = styled.ol`
  margin: 0;
  padding: 0;
  margin-bottom: 2px;
`;

const Container = styled.div`
    font-size: .8em;
`;

const SourceSpan = styled.span`
    font-weight: 600;
`;

type NewsProps = {
  news: {
    guardian: string;
    smh: string;
  }
};

const NewsItem = ({ source, headline }: {source: string, headline: string}) => <StyledOl><SourceSpan>{source}</SourceSpan>: {headline}</StyledOl>;

export const NewsPanel = ({ news }: NewsProps) => {
  const { guardian, smh } = news;

  return <Container>
    <StyledUl>
      <NewsItem source="Guardian" headline={guardian} />
      <NewsItem source="SMH" headline={smh} />
    </StyledUl>
  </Container>;
};
