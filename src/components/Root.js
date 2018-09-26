import React, {Component} from 'react'
import CityAdding from './CityAdding'
import List from './List'

class Root extends Component {
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

export default Root