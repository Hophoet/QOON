// import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer, createSwitchNavigator } from 'react-navigation';

import Enter from '../screens/Enter'
import Main from '../screens/Main'
import Check from '../screens/Check'
import Splash from '../screens/Splash'


const Nav = createSwitchNavigator({
    Splash:{
      screen:Splash
    },
    Enter:{
      screen: Enter,
    },
    Main:{
        screen:Main
    },
    Check:{
      screen:Check
    }
  }, {initialRouteName:'Splash'})


   
  export default createAppContainer(Nav)

