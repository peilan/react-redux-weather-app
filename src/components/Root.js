import React, {Component} from 'react'
import PropTypes from 'prop-types';
import CityAdding from './CityAdding'
import List from './List'
import {connect} from 'react-redux'
import {
  getWeatherByCurrentLocation,
  getFromLocalStorage
} from '../ducks/weather'

class Root extends Component {
  componentDidMount() {
    this.props.getWeatherByCurrentLocation()
    this.props.getFromLocalStorage()
  }

  render() {
    return (
      <div>
        <h1>Weather application</h1>
        <br/>
        <CityAdding />
        <br/>
        <List />
      </div>
    );
  }
}

Root.propTypes = {
  getFromLocalStorage: PropTypes.func.isRequired,
  getWeatherByCurrentLocation: PropTypes.func.isRequired
}

export default connect(null, {
  getWeatherByCurrentLocation,
  getFromLocalStorage
})(Root)