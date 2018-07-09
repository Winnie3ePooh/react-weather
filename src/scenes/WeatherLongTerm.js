import React from 'react'
import Weather from './Weather'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Loading from '../components/Loading'
import Slider from 'react-slick'
import Container from '../components/Container'

import * as utils from '../helpers/utils'
import * as WS from '../services/weather.service'

require('../../node_modules/slick-carousel/slick/slick.css')
require('../../node_modules/slick-carousel/slick/slick-theme.css')

function TabContainer ({ children }) {
  return (
    <Typography component='div' style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  )
}

function WeatherList ({ weather }) {
  const weatherList = weather.map((elem, idx) => {
    return (
      <div key={idx}>
        <Weather currWeather={elem} term={true} />
      </div>
    )
  })
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  return (
    <Slider {...settings}>
      {weatherList}
    </Slider>
  )
}

class WeatherLongTerm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
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
      this.groupedResult.push([{date: item, buf}])
      buf = []
    }
  }

  componentWillMount () {
    WS.getTodaysCityWeather(this.props.city.name, this.props.term)
      .then(resp => {
        this.getDateSet(resp.data.list)
        let filteredResult = resp.data.list.filter(this.weatherFilter)
        filteredResult.forEach(el => utils.dateFormating(el, 'days'))
        this.setState({
          currWeather: filteredResult,
          loading: false
        })
      })
      .catch(err => console.log(err))
  }

  render () {
    return (
      <DayWeatherWrapper>
        { this.state.loading
          ? <Loading />
          : <WeatherList weather={this.state.currWeather} />
        }
      </DayWeatherWrapper>
    )
  }
}

export default WeatherLongTerm


const DayWeatherWrapper = Container.extend`
  flex-direction: column;
  width: 100%;
`
