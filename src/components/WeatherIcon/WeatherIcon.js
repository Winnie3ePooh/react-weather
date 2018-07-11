import React from 'react'
import styled from 'styled-components'
import { Container } from 'components/Container'
import clearSky from 'assets/weather-svg/Sun.svg'
import fewClouds from 'assets/weather-svg/Cloud-Sun.svg'
import cloud from 'assets/weather-svg/Cloud.svg'
import showerRain from 'assets/weather-svg/Cloud-Rain.svg'
import rain from 'assets/weather-svg/Cloud-Rain-Alt.svg'
import thunderstorm from 'assets/weather-svg/Cloud-Lightning.svg'
import snow from 'assets/weather-svg/Cloud-Snow-Alt.svg'
import mist from 'assets/weather-svg/Cloud-Fog.svg'
import celcius from 'assets/weather-svg/Degrees-Celcius.svg'

const weatherIconUrls = [
  {
    type: '01d',
    img: clearSky
  },
  {
    type: '02d',
    img: fewClouds
  },
  {
    type: '03d',
    img: cloud
  },
  {
    type: '04d',
    img: cloud
  },
  {
    type: '09d',
    img: showerRain
  },
  {
    type: '10d',
    img: rain
  },
  {
    type: '10d',
    img: rain
  },
  {
    type: '11d',
    img: thunderstorm
  },
  {
    type: '13d',
    img: snow
  },
  {
    type: '50d',
    img: mist
  },
  {
    type: 'celcius',
    img: celcius
  }
]

const weatherIcon = ({ weatherType }) => {
  const iconImg = weatherIconUrls.find(el => {
    return el.type === weatherType
  }).img
  return iconImg
}

class WeatherIcon extends React.Component {
  render () {
    return (
      <WeatherIconWrapper>
        <Icon weatherType={this.props.type} />
      </WeatherIconWrapper>
    )
  }
}

export default WeatherIcon

const WeatherIconWrapper = Container.extend`
  width: 100%;
`

const Icon = styled.div`
  height: 180px;
  background: url('${weatherIcon}') no-repeat center center;
  background-size: cover;
`
