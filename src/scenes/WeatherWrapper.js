import React from 'react'
import styled from 'styled-components'

import Container from '../components/Container'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'

import Loading from '../components/Loading'
import Weather from './Weather'
import WeatherLongTerm from './WeatherLongTerm'
import CityTitle from '../components/CityTitle'

import * as WS from '../services/weather.service'

function TabContainer ({ children }) {
  return (
    <Typography component='div' style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  )
}

function Warning ({ mess }) {
  return (
    <h2 className='center-align'>Something went wrong. Try again later.</h2>
  )
}

class WeatherWrapper extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: 0,
      loading: true,
      currWeather: [],
      error: false
    }
    this.getTodaysCityWeather = this.getTodaysCityWeather.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event, value) {
    if (value === 0) {
      this.setState({ loading: true })
      this.getTodaysCityWeather()
    }
    this.setState({ value })
  }

  componentDidMount () {
    this.getTodaysCityWeather()
  }

  getTodaysCityWeather () {
    WS.getTodaysCityWeather(this.props.city.name, 'today')
      .then(resp => {
        this.setState({
          currWeather: resp.data,
          loading: false,
          error: false
        })
      })
      .catch(err => {
        this.setState({
          error: true
        })
      })
  }

  render () {
    return (
      <WeatherContainer>
        <CityTitle title={this.props.city.name} />
        <NavContainer>
          <AppBar position='static' color='default'>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor='primary'
              textColor='primary'
              centered
            >
              <Tab clas label="Today's" selected />
              <Tab label='5 days' />
              <Tab label='16 days' />
            </Tabs>
          </AppBar>
        </NavContainer>
        {this.state.error ? (
          <Warning mess={this.state.message} />
        ) : (
          <React.Fragment>
            {this.state.value === 0 && (
              <TabContainer>
                {this.state.loading ? (
                  <Loading />
                ) : (
                  <Weather currWeather={this.state.currWeather} term={false} />
                )}
              </TabContainer>
            )}
            {this.state.value === 1 && (
              <TabContainer>
                <WeatherLongTerm city={this.props.city} term='long' />
              </TabContainer>
            )}
            {this.state.value === 2 && (
              <TabContainer>
                <WeatherLongTerm city={this.props.city} term='long' />
              </TabContainer>
            )}
          </React.Fragment>
        )}
      </WeatherContainer>
    )
  }
}

export default WeatherWrapper

const WeatherContainer = Container.extend`
  width: 80%;
`

const NavContainer = Container.extend`
  width:50%
`
