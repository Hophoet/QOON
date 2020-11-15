import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Easing, Dimensions, Animated} from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons"



export default class CheckLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            rotateValue: new Animated.Value(0)
         }
    }
    _animated = () => {
        Animated.sequence([
            Animated.timing(this.state.rotateValue, {
                toValue:100,
                duration:2000,
                easing: Easing.linear,
                useNativeDriver: true,

            }),
            Animated.timing(this.state.rotateValue, {
                toValue:0,
                duration:0,
                useNativeDriver: true,

            })

        ], { useNativeDriver:true}).start( () => {
            this._animated()
        })
        
    }

    componentDidMount() {
        this._animated()
    }


    render() { 
        const interpolateRotateAnimation = this.state.rotateValue.interpolate({
            inputRange: [0, 100],
            outputRange: ['0deg', '360deg'],
        })
        return ( 
            <Animated.View  style={[styles.container, 
                {
                    transform: [{ rotate: interpolateRotateAnimation }]
                }
            ]}>
                <Ionicons name='ios-settings' size={width/10} color={this.props.color?this.props.color:'white'} />
            </Animated.View>
         );
    }
}

const {width, height} = Dimensions.get('window')
 

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
    }
})