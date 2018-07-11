import React from 'react'
import WeatherCard from 'components/WeatherCard'
import Loading from 'components/Loading'
import Slider from 'react-slick'
import { WeatherCardsContainer } from 'components/Container'
import Typography from '@material-ui/core/Typography'
import bgImage from 'assets/bg.jpg'

import * as utils from 'helpers/utils'
import * as WS from 'services/weather.service'

require('../../../node_modules/slick-carousel/slick/slick.css')
require('../../../node_modules/slick-carousel/slick/slick-theme.css')

function TabContainer ({ children }) {
  return (
    <Typography component='div' align='center'>
      {children}
    </Typography>
  )
}

function WeatherList ({ weather }) {
  const weatherList = weather.map((elem, idx) => {
    return <WeatherCard key={idx} currWeather={elem} term={false} />
  })
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  return (
    <DayWeatherWrapper term>
      <Slider {...settings}>{weatherList}</Slider>
    </DayWeatherWrapper>
  )
}

class WeatherLongTerm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lastCityName: this.props.city.name,
      loading: true
    }
    this.getWeatherData = this.getWeatherData.bind(this)
  }

  weatherFilter (obj) {
    if (obj.dt_txt.split(' ')[1] === '15:00:00') return true
  }

  getDateSet (objs) {
    let buf = new Set()
    objs.forEach(obj => {
      buf.add(obj.dt_txt.split(' ')[0])
    })
    this.setState({
      buf: [...buf]
    })
  }

  detailedWeatherProcessing (data) {
    let buf = []
    for (let item of this.state.buf) {
      buf = data.filter(data => {
        if (data.dt_txt.includes(item)) return true
      })
      buf.forEach(el => utils.dateFormating(el, 'hours'))
      this.groupedResult.push([{ date: item, buf }])
      buf = []
    }
  }

  componentDidMount () {
    this.getWeatherData()
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.city.name !== this.props.city.name) {
      this.getWeatherData()
    }
  }

  async getWeatherData () {
    this.setState({ loading: true })
    try {
      let weatherData = await WS.getTodaysCityWeather(
        this.props.city.name,
        this.props.term
      )
      this.getDateSet(weatherData.list)
      let filteredResult = weatherData.list.filter(this.weatherFilter)
      filteredResult.forEach(el => utils.dateFormating(el, 'days'))
      this.setState({
        currWeather: filteredResult,
        loading: false
      })
    } catch (error) {
      this.setState({
        error: true
      })
    }
  }

  render () {
    return (
      <TabContainer>
        {this.state.loading ? (
          <Loading />
        ) : (
          <WeatherList weather={this.state.currWeather} />
        )}
      </TabContainer>
    )
  }
}

export default WeatherLongTerm

const DayWeatherWrapper = WeatherCardsContainer.extend``
