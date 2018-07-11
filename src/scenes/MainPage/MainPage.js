import React from 'react'
import { Container } from 'components/Container'
import CityInput from 'components/Input'
import WeatherWrapper from 'scenes/WeatherWrapper'
import styled from 'styled-components'
import Title from 'components/Title'
import Loading from 'components/Loading'

import * as weatherService from 'services/weather.service'

class MainPage extends React.Component {
  constructor () {
    super()
    this.state = {
      isLoading: true,
      selectedCityName: null
    }
    this.getWeather = this.getWeather.bind(this)
  }

  async componentDidMount () {
    let citiesList = []
    try {
      citiesList = await weatherService.getCitiesList()
    } catch (error) {
      citiesList = []
    }
    this.setState({
      citiesList: citiesList,
      isLoading: false
    })
  }

  getWeather () {
    const cityName = this.refs.cityNameInput.state.selectedCity
    this.setState({
      selectedCityName: cityName
    })
  }

  render () {
    return (
      <AppWrapper>
        <Title title='Weather' />
        <MainContent>
          {this.state.isLoading ? (
            <Loading />
          ) : (
            <React.Fragment>
              <CityInput
                ref='cityNameInput'
                getWeather={this.getWeather}
                citiesList={this.state.citiesList}
              />
              {this.state.selectedCityName && (
                <WeatherWrapper city={this.state.selectedCityName} />
              )}
            </React.Fragment>
          )}
        </MainContent>
      </AppWrapper>
    )
  }
}

export default MainPage

const AppWrapper = Container.extend``

const MainContent = AppWrapper.extend`
  width: 100%;
  margin: 0;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
`
