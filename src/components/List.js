import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {citiesSelector, loadingSelector, deleteCity} from '../ducks/weather'
import Loading from './Loading' 
import Item from './ListItem'

class List extends Component {
  render() {
    if (this.props.loading) 
      return <div>
        <h2>City list:</h2>
        <Loading/>
      </div>
      
    if (this.props.cities.length)
      return (<div>
        <h2>City list:</h2>
        {this.props.cities.map(city => <Item name={city.name} weather={city.weather}/>)}
      </div>)

    return null
  }
}

List.propTypes = {
  cities: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
}

export default connect(state => ({
  cities: citiesSelector(state),
  loading: loadingSelector(state)
}), {deleteCity})(List);