import React, { Component } from 'react';
import {connect} from 'react-redux'
import {citiesSelector, deleteCity} from '../ducks/weather'

class List extends Component {
  renderCity(city) {
    return <div>
      {city.name}
      <button onClick={() => this.props.deleteCity(city.name)}>delete</button>
    </div>
  }

  render() {
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
  cities: citiesSelector(state) 
}), {deleteCity})(List);