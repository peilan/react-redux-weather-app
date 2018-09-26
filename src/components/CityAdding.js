import React, { Component } from 'react';
import {connect} from 'react-redux'
import {addCity} from '../ducks/weather'

class CityAdding extends Component {
  constructor(props) {
    super(props)
    this.input = React.createRef();
  }

  addClicked() {
    const city = this.input.current.value
    this.props.addCity({name: city})
    this.input.current.value = ''
  }

  render() {
    return (
      <div>
        <h2>City Adding:</h2>
        <input ref={this.input} type='text'/>
        <button onClick={() => this.addClicked()}>Add</button>
      </div>
    );
  }
}

export default connect(null, {addCity})(CityAdding)