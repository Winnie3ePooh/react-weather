import React from 'react'
import styled from 'styled-components'

import { Container } from 'components/Container'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'

import Warning from 'components/Warning'
import Loading from 'components/Loading'
import WeatherCard from 'components/WeatherCard'
import WeatherLongTerm from 'scenes/WeatherLongTerm'
import CityTitle from 'components/CityTitle'

import * as WS from 'services/weather.service'

function TabContainer ({ children }) {
  return (
    <Typography component='div' align='center' style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
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

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.city.name !== this.props.city.name) {
      this.getTodaysCityWeather()
    }
  }

  async getTodaysCityWeather () {
    this.setState({ loading: true })
    try {
      const weatherData = await WS.getTodaysCityWeather(
        this.props.city.name,
        'today'
      )
      this.setState({
        currWeather: weatherData,
        loading: false,
        error: false
      })
    } catch (error) {
      this.setState({
        error: true
      })
    }
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
                  <WeatherCard currWeather={this.state.currWeather} term />
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
  justify-content: center;
  color: #ffffff;
`

const NavContainer = Container.extend`
  width: 50%;
`
