// @flow

import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from '../containers/home';
import Selected from '../containers/selected';

const RootStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  Selected: {
    screen: Selected,
    navigationOptions: {
      header: null
    }
  }
});

const AppContainer = createAppContainer(RootStack);

export default AppContainer;
