import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind'
import styled from 'styled-components'
import { FaTrashAlt } from 'react-icons/fa';

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
  width: 70px;
  text-align: center;
`
const Delete = styled.div`
  width: 30px;
  text-align: center; 
  cursor: pointer;
  color: #801717
`

class ListItem extends Component {
  deleteCity() {
    const {name} = this.props
    this.props.deleteCity(name)
    autobind(this)
  }

  render() {
    const {name, weather} = this.props
    const icon = weather.weather[0].icon
    const temperature = parseInt(weather.main.temp - 273, 10)

    return (<City key={name}>
      <Name>{name}</Name>
      <Image src={`https://openweathermap.org/img/w/${icon}.png`} /> 
      <Temperature>{temperature} °C</Temperature>
      <Delete onClick={this.deleteCity} href="#"><FaTrashAlt/></Delete>
    </City>);
  }
}

ListItem.propTypes = {
  weather: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
};

export default ListItem;