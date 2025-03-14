import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="cssloader">
        <div className="triangle1" />
        <div className="triangle2" />
        <p className="text">Please Wait</p>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .triangle1 {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 50px 50px 0 0;
    border-color: #8086e0 transparent transparent transparent;
    margin: 0 auto;
    animation: shk1 1s ease-in-out infinite normal;
  }

  .triangle2 {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 50px 50px;
    border-color: transparent transparent #6554b388 transparent;
    margin: -50px auto 0;
    animation: shk2 1s ease-in-out infinite alternate;
  }
  @keyframes shk1 {
    0% {
      transform: rotate(-360deg);
    }

    100% {
    }
  }

  @keyframes shk2 {
    0% {
      transform: rotate(360deg);
    }
    100% {
    }
  }

  .text {
    color: #949494;
    margin: 30px auto;
    text-align: center;
    font-weight: 500;
    letter-spacing: 4px;
  }`;

export default Loader;
