import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import LookingThrash from './assets/looking_thrash.png';
import montreal from './assets/montreal.jpg';
import pothole from './assets/pothole.jpg';
import slippery from './assets/slippery.jpg';
import snow from './assets/snow.jpg';
import street from './assets/street.jpg';
import cleanliness from './assets/cleanliness.jpg';
import graffiti from './assets/graffiti.jpg';
import broken from './assets/broken.jpg';

const Canada311 = () => {
  return (
    <Container>
      <Montreal src={montreal} alt="snow" />
      <Line>
        <Block>
          <Img src={snow} alt="snow" />
        </Block>
        <Block>
          <Img src={slippery} alt="snow" />
        </Block>
      </Line>
      <Line>
        <Block>
          <Img src={pothole} alt="snow" />
        </Block>
        <Block>
          <Img src={graffiti} alt="snow" />
        </Block>
      </Line>
      <Line>
        <Block>
          <Img src={street} alt="snow" />
        </Block>
        <Block>
          <Img src={cleanliness} alt="snow" />
        </Block>
      </Line>
      <Line>
        <Block>
          <Img src={broken} alt="snow" />
        </Block>
        <Block>
          <StyledLink to="/map">
            <Img
              src={LookingThrash}
              alt="LookingThrash"
              style={{ height: '32px', width: '32px' }}
            />
            <Title>Looking for thrash can?</Title>
            <Paragraph>
              If there is a thrash can nearby, you can find it here
            </Paragraph>
          </StyledLink>
        </Block>
      </Line>
    </Container>
  );
};

export default Canada311;

const Montreal = styled.img`
  width: 100%;
  height: 200px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
`;

const Line = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  width: 100%;
`;

const Block = styled.div`
  height: 200px;
  width: 50%;
`;

const Img = styled.img`
  height: 200px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin: 5px;
`;

const Paragraph = styled.div`
  font-size: 11px;
`;

const StyledLink = styled(Link)`
  padding: 12px;
  border: none;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
