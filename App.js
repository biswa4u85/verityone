import React, { Component } from 'react';
import RootRouter from './src/Router'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from '@redux'
import { createStore, compose, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'

let store = null
const middleware = [thunk]
store = compose(applyMiddleware(...middleware))(createStore)(reducers)
let persistor = persistStore(store)


export default class App extends React.Component {

  constructor(props) {
    super()
    this.state = {
      appIsReady: false
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('@assets/Fonts/Roboto.ttf'),
      'Roboto_medium': require('@assets/Fonts/Roboto_medium.ttf'),
      'Entypo': require('@assets/Fonts/Entypo.ttf'),
      'EvilIcons': require('@assets/Fonts/EvilIcons.ttf'),
      'Feather': require('@assets/Fonts/Feather.ttf'),
      'FontAwesome': require('@assets/Fonts/FontAwesome.ttf'),
      'FontAwesome5_Brands': require('@assets/Fonts/FontAwesome5_Brands.ttf'),
      'FontAwesome5_Regular': require('@assets/Fonts/FontAwesome5_Regular.ttf'),
      'FontAwesome5_Solid': require('@assets/Fonts/FontAwesome5_Solid.ttf'),
      'Foundation': require('@assets/Fonts/Foundation.ttf'),
      'Ionicons': require('@assets/Fonts/Ionicons.ttf'),
      'MaterialCommunityIcons': require('@assets/Fonts/MaterialCommunityIcons.ttf'),
      'MaterialIcons': require('@assets/Fonts/MaterialIcons.ttf'),
      'Octicons': require('@assets/Fonts/Octicons.ttf'),
      'SimpleLineIcons': require('@assets/Fonts/SimpleLineIcons.ttf'),
      'Zocial': require('@assets/Fonts/Zocial.ttf'),
    });
    this.setState({ appIsReady: true })
  }

  render() {
    if (!this.state.appIsReady) {
      return <Expo.AppLoading />
    }

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RootRouter />
        </PersistGate>
      </Provider>
    );
  }
}
