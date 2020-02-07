import React from 'react'
import {StyleSheet, View, Image, Dimensions, StatusBar, Text, TouchableOpacity} from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons"
import colors from './colors/colors'

export default class  Main extends React.Component{
  //GOOMA
    _play = () => {
        // alert('PLAY')
        this.props.navigation.navigate('Main', {})
    }
    render(){
        return(
            <View style={styles.container}>
                <StatusBar backgroundColor='#212121'/>
                <View style={styles.main}>
                    <Text style={styles.title}>QOON</Text>
                    <Text style={styles.description}>Train Your Brain</Text>
                    <TouchableOpacity style={styles.playButtonContainer} onPress={this._play}>
                        <Ionicons name='ios-play' size={width/10} color={'#1cadff'} />

                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.background,
        justifyContent:'center'
    },
    main:{
        // flex:1,
        backgroundColor:colors.onBackround,
        justifyContent:'center',
        alignItems:'center',
        padding:20,
        marginHorizontal:20,
        borderRadius:5,
        elevation:10,
        height:Dimensions.get('window').width/1.2,
    },
    playButtonContainer:{
        backgroundColor:colors.onBackround,
        borderColor:'white',
        // borderWidth:1,
        borderRadius:60,
        width:width/5,
        height:width/5,
        justifyContent:'center',
        alignItems:'center',
        margin:5,
        elevation:10
        
    },
    playButtonText:{
        fontWeight:'bold',
        color:'white',
        fontSize:17
        // fontFamily:'sans-serif'
    },
    title:{
        color:'#1cadff',
        fontWeight:'bold',
        fontSize:30
    },
    description:{
        color:'white'
    },
    brainImage:{
        width:Dimensions.get('window').width/2,
        height:Dimensions.get('window').width/2,
    }
})