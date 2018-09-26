import React, { Component } from 'react';
import {connect} from 'react-redux'
import {citiesSelector, loadingSelector, deleteCity} from '../ducks/weather'
import Loading from './Loading' 

class List extends Component {
  renderCity(city) {
    return <div>
      {city.name}: {parseInt(city.weather.main.temp - 273, 10)}
      <button onClick={() => this.props.deleteCity(city.name)}>delete</button>
    </div>
  }

  render() {
    if (this.props.loading) 
      return <div>
        <h2>City list</h2>
        <Loading/>
      </div>
      
    if (this.props.cities.length)
      return (<div>
        <h2>City list</h2>
        <ul>
          {this.props.cities.map(city => <li key={city.name}>{this.renderCity(city)}</li>)}
        </ul>
      </div>)

    return null
  }
}

export default connect(state => ({
  cities: citiesSelector(state),
  loading: loadingSelector(state)
}), {deleteCity})(List);