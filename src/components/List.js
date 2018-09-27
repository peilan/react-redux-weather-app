import React, { Component } from 'react';
import {connect} from 'react-redux'
import {citiesSelector, loadingSelector, deleteCity} from '../ducks/weather'
import Loading from './Loading' 
import { FaTrashAlt } from 'react-icons/fa';
import styled from 'styled-components'

const Image = styled.img`
  width: 50px;
  height: 50px;
`
const City = styled.div`
  line-height: 50px;
  display: flex;
  align-items: center;
`
const Name = styled.div`
  width: 150px;
`
const Temperature = styled.div`
  width: 30px;
  text-align: center;
`
const Delete = styled.a`
  width: 15px;
`
class List extends Component {
  renderCity(city) {
    const icon = city.weather.weather[0].icon
    const temperature = parseInt(city.weather.main.temp - 273, 10)
    return (<City key={city.name}>
      <Name>{city.name}</Name>
      <Image src={`https://openweathermap.org/img/w/${icon}.png`} /> 
      <Temperature>{temperature}</Temperature>
      <Delete href="#"><FaTrashAlt/></Delete>
    </City>);
  }

  render() {
    if (this.props.loading) 
      return <div>
        <h2>City list:</h2>
        <Loading/>
      </div>
      
    if (this.props.cities.length)
      return (<div>
        <h2>City list:</h2>
        {this.props.cities.map(city => this.renderCity(city))}
      </div>)

    return null
  }
}

export default connect(state => ({
  cities: citiesSelector(state),
  loading: loadingSelector(state)
}), {deleteCity})(List);