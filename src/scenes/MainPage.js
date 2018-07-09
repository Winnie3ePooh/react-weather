import React from 'react'
import Container from '../components/Container'
import CityInput from './CityInput'
import WeatherWrapper from './WeatherWrapper'
import styled from 'styled-components'
import Title from '../components/Title'
import Loading from '../components/Loading'

import * as weatherService from '../services/weather.service'

class MainPage extends React.Component {
  constructor () {
    super()
    this.state = {
      isLoading: true,
      selectedCityName: null
    }
    this.getWeather = this.getWeather.bind(this)
  }

  componentDidMount () {
    weatherService.getCitiesList()
      .then(resp => {
        this.setState({
          citiesList: resp.data,
          isLoading: false
        })
      })
      .catch(err => console.log(err))
  }

  getWeather () {
    console.log('я тут')
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
          { this.state.isLoading
            ? <Loading />
            : <React.Fragment>
              <CityInput ref='cityNameInput'
                getWeather={this.getWeather}
                citiesList={this.state.citiesList}
              />
              {this.state.selectedCityName && <WeatherWrapper
                city={this.state.selectedCityName}
              />}
            </React.Fragment>
          }
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
`
