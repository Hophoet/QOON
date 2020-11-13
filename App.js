/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

//components
import CheckLoader from './components/animations/CheckLoader'
import Nav from './navigations/Navigators'

export default class App extends React.Component{
    render(){
      return (
        <Nav/>
      )
    }
}


