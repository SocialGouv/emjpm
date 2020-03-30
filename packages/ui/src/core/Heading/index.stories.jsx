import styled from '@emotion/styled';
import React from 'react';

import { Heading0, Heading1, Heading2, Heading3, Heading4, Heading5 } from '.';

const Info = styled.div`
  margin-bottom: 3rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 20px;
  > * {
    flex: 1;
    padding-right: 40px;
  }
`;

const Page = styled.div`
  padding: 3rem;
`;

export default {
  component: Heading1,
  title: 'Core |Heading',
};

export const HeadingStory = () => (
  <Page>
    <Info>
      <div>
        <b>Font:</b> Quicksand
      </div>
      <div>
        <b>Weight:</b> 600(bold)
      </div>
    </Info>
    <Wrapper>
      <Heading1>Heading1</Heading1>
    </Wrapper>
    <Wrapper>
      <Heading2>Heading1</Heading2>
    </Wrapper>
    <Wrapper>
      <Heading3>Heading1</Heading3>
    </Wrapper>
    <Wrapper>
      <Heading4>Heading1</Heading4>
    </Wrapper>
    <Wrapper>
      <Heading5>Heading1</Heading5>
    </Wrapper>
  </Page>
);

HeadingStory.story = {
  name: 'All heading',
};

export const HeadingStory0 = () => <Heading0>Heading1</Heading0>;

export const HeadingStory1 = () => <Heading1>Heading1</Heading1>;

export const HeadingStory2 = () => <Heading2>Heading2</Heading2>;

export const HeadingStory3 = () => <Heading3>Heading3</Heading3>;

export const HeadingStory4 = () => <Heading4>Heading4</Heading4>;

export const HeadingStory5 = () => <Heading5>Heading5</Heading5>;
