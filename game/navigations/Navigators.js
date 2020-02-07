// import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer, createSwitchNavigator } from 'react-navigation';

import Enter from '../Enter'
import Main from '../Main'
import Check from '../Check'



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

