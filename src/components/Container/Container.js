import styled from 'styled-components'
import bgImage from 'assets/bg.jpg'

export const Container = styled.div`
  width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
`
export const WeatherCardsContainer = Container.extend`
  width: 500px;
  position: relative;
  font-family: 'Montserrat', sans-serif;
  color: #ffffff;
  ${({ term }) =>
    term &&
    `&::before {
      background: url('${bgImage}') no-repeat center center fixed;
      background-size: cover;
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      filter: blur(10px);
      z-index: -1;
    }`};
`
