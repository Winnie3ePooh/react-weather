import React from 'react'
import styled from 'styled-components'
import { Container, WeatherCardsContainer } from 'components/Container'
import WeatherIcon from 'components/WeatherIcon'
import * as utils from '../helpers/utils'

class Weather extends React.Component {
  render () {
    return (
      <WeatherCardsContainer term={this.props.term}>
        <WeatherCardDate>
          {utils.unixDateFormating(this.props.currWeather.dt)}
        </WeatherCardDate>
        <WeatherCardMain>
          <WeatherIcon type={this.props.currWeather.weather[0].icon} />
          <h3>{this.props.currWeather.weather[0].description}</h3>
          <h3>{this.props.currWeather.main.temp} &deg;C</h3>
        </WeatherCardMain>
        <WeatherCardAdditional>
          <WeatherCardElem>
            <h3>Max temp</h3>
            <Text>{this.props.currWeather.main.temp_max} &deg;C</Text>
          </WeatherCardElem>
          <WeatherCardElem>
            <h3>Min temp</h3>
            <Text>{this.props.currWeather.main.temp_min} &deg;C</Text>
          </WeatherCardElem>
          <WeatherCardElem>
            <h3>Wind</h3>
            <Text>{this.props.currWeather.wind.speed} m/s</Text>
          </WeatherCardElem>
          <WeatherCardElem>
            <h3>Pressure</h3>
            <Text>{this.props.currWeather.main.pressure} Pa</Text>
          </WeatherCardElem>
        </WeatherCardAdditional>
      </WeatherCardsContainer>
    )
  }
}

const WeatherCardDate = styled.h2`
  text-align: center;
  font-size: 28px;
`

const WeatherCardMain = styled.div`
  position: relative;
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 5%;
    width: 90%;
    height: 1px;
    background-color: #446375;
  }
  &::before {
    top: 0;
  }
  &::after {
    bottom: 0;
  }
`

const WeatherCardAdditional = Container.extend`
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
`

const WeatherCardElem = Container.extend`
  width: 25%;
  height: 100px;
  position: relative;
  &:not(:last-child):after {
    content: '';
    position: absolute;
    top: 10%;
    right: 0;
    height: 80%;
    width: 1px;
    background-color: #446375;
  }
`

const Text = styled.span`
  font-size: 16px;
`

export default Weather
