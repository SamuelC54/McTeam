import React from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

const Video = () => {
  return (
    <Container>
      <ReactPlayer url="https://twitch.tv/kelipop2" playing />
    </Container>
  );
};

export default Video;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
`;
