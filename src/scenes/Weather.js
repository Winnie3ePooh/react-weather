import React from "react";
import * as utils from '../helpers/utils';

require('./Weather.css');

class Weather extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const classes = `condition-wrapper__img ${this.props.currWeather.weather[0].description.replace(' ', '-')}`
    return (
      <React.Fragment>
        <div className="row">
          <div className="col l8 offset-l2">
            <div className="row">
              <h1 className="center-align">{utils.unixDateFormating(this.props.currWeather.dt)}</h1>
            </div>
            <div className="card horizontal hoverable">
              <div className="card-image weather">
                <div className="row centered weather-condition">
                  <div className={classes}></div>
                  <span className="condition-wrapper__text">
                    {this.props.currWeather.weather[0].description}
                  </span>
                </div>
                <div className="row centered">
                  <div>
                    <span>{this.props.currWeather.main.temp} &deg;C</span>
                  </div>
                </div>
              </div>
              <div className="card-stacked">
                <div className="card-content">
                  <table className="weather-table">
                    <tbody>
                      <tr>
                        <td>
                          <div className="row centered weather-condition">
                            <span className="condition-wrapper__text">
                              {this.props.currWeather.main.temp_max} &deg;C
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="row centered weather-condition">
                            <span className="condition-wrapper__text">
                              {this.props.currWeather.main.temp_min} &deg;C
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="row centered weather-condition">
                            <span className="condition-wrapper__text">
                              {this.props.currWeather.wind.speed}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="row centered weather-condition">
                            <span className="condition-wrapper__text">
                              {this.props.currWeather.main.pressure}
                            </span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
      	</div>
      </React.Fragment>
    )
  }
}

export default Weather;
