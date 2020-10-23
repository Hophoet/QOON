import React from 'react'
import {StyleSheet, View, StatusBar, Text, Dimensions, TouchableOpacity} from 'react-native'
import AntDesign from 'react-native-vector-icons/Ionicons'
import colors from '../assets/colors/colors'

export default class  RandomNumberSelection extends React.Component{
    
   
    render(){
        return(
            <View style={[styles.container, {...this.props.style}]}>
                <View style={styles.titleContainer}>
                    <Text style={styles.value}>Choose random numbers</Text>
                </View>
                <View style={styles.selectionContainer}>
                    <TouchableOpacity 
                        onPress={this.props.parent.props.minusRandomSelectedNumber} 
                        style={styles.selectionButton}
                    >
                        <AntDesign name='ios-arrow-back' color='white' size={20}/>
                    </TouchableOpacity>
                    <Text style={styles.numberSelected}>{this.props.parent.props.randomSelectedNumber}</Text>
                    <TouchableOpacity 
                        onPress={this.props.parent.props.plusRandomSelectedNumber} 
                        style={styles.selectionButton}
                    >
                        <AntDesign name='ios-arrow-forward' color='white' size={20}/>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

const {width, height} = Dimensions.get('window')


const styles = StyleSheet.create({
    container:{
        padding:0,
        backgroundColor:colors.onBackround,
        elevation:10,
        marginHorizontal:10,
        padding:10,
        flexDirection:'row',
        justifyContent:'space-around'
    },
    value:{
        color:'white',
        fontWeight:'bold',
        fontSize:20
    },
    numberSelected:{
        color:'white',
        marginHorizontal:10
    },
    selectionContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    selectionButton:{
        backgroundColor:'#00000055',
        paddingHorizontal:7,
        paddingVertical:2
    }
})