// import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer, createSwitchNavigator } from 'react-navigation';

import Enter from '../screens/Enter'
import Main from '../screens/Main'
import Check from '../screens/Check'



const Nav = createSwitchNavigator({
    Enter:{
      screen: Enter,
    },
    Main:{
        screen:Main
    },
    Check:{
      screen:Check
    }
  }, {initialRouteName:'Enter'})


   
  export default createAppContainer(Nav)

