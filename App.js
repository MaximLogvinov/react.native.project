import React from 'react';
import {Provider} from 'react-redux';
// local dependencies
import  AppWithNavigationState  from './src/navigation/Navigator';
import store from './store'
export default class App extends React.Component {
  render() {
      return (
          <Provider store={store}>
              <AppWithNavigationState />
          </Provider>
      );
  }
}
