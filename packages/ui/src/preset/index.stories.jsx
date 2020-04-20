import styled from '@emotion/styled';
import React from 'react';

import { presetEmjpm } from '.';

const { colors } = presetEmjpm;

const Swatch = styled.div`
  width: 100px;
  height: 50px;
`;

const SwatchHex = styled.div`
  padding: 10px;
  margin-right: 30px;
  width: 100px;
`;

const SwatchGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1.25rem;
`;

const Swatches = styled.div``;

const ColorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  > ${Swatches} {
    flex: 1;
    padding-right: 40px;
  }
`;

const Page = styled.div`
  padding: 3rem;
`;

const colorfulColors = Object.entries(colors).map(([key, value]) => {
  return {
    color: value,
    name: key,
  };
});

export default {
  title: 'Theme |Colors',
};

export const all = () => (
  <Page>
    <ColorWrapper>
      <Swatches>
        {colorfulColors.map((swatch) => (
          <SwatchGroup key={swatch.color}>
            <SwatchHex>{`${swatch.name}`}</SwatchHex>
            <Swatch style={{ background: swatch.color }} />
            <Swatch style={{ background: swatch.color, opacity: 0.8 }} />
            <Swatch style={{ background: swatch.color, opacity: 0.6 }} />
            <Swatch style={{ background: swatch.color, opacity: 0.3 }} />
          </SwatchGroup>
        ))}
      </Swatches>
    </ColorWrapper>
  </Page>
);
