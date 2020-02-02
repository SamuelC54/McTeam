import React from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

const Video = () => {
  return (
    <Container>
      <ReactPlayer
        url="https://twitch.tv/kelipop2"
        playing
        width="100%"
        height="100%"
      />
    </Container>
  );
};

export default Video;

const Container = styled.div`
  width: 100%;
  height: 100%;
  pointer-events: none;
`;
