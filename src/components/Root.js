import React, {Component} from 'react'
import CityAdding from './CityAdding'
import List from './List'
import {connect} from 'react-redux'
import {getWeatherByCurrentLocation} from '../ducks/weather'

class Root extends Component {
  componentDidMount() {
    this.props.getWeatherByCurrentLocation()
  }

  render() {
    return (
      <div>
        <h1>Weather application!</h1>
        <br/>
        <CityAdding />
        <br/>
        <List />
      </div>
    );
  }
}

export default connect(null, {getWeatherByCurrentLocation})(Root)