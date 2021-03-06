import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import {Provider} from 'react-redux'
import store from './redux'

ReactDOM.render(<Provider store={store}>
    <Root />
</Provider>, document.getElementById('root'));