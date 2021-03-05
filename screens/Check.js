import React from 'react'
import {StyleSheet, ScrollView, View, StatusBar, TextInput, Text, Dimensions, TouchableOpacity} from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons"

import colors from '../assets/colors/colors'
//components
import Number from '../components/Number'

export default class  Check extends React.Component{
    constructor(props){
        super(props)
        this.randomSelectedNumber = this.props.navigation.state.params.randomSelectedNumber

        this._getNumbers()
        this.state = {
        
            
        }
    }


    componentDidMount(){
        this._getNumbers()
    }

   
    _getNumbers = () =>{
        let params = this.props.navigation.state.params
        let {randomNumbers, playerSelectedNumbers} = this.props.navigation.state.params.numbers
        this.randomNumbers = randomNumbers.map(number=>parseInt(number))
        this.playerSelectedNumbers = playerSelectedNumbers.map(number=>parseInt(number))
        // console.log(this.randomNumbers, this.playerSelectedNumbers)
    }

    _getCorrectAnswerCount = () => {
        let counter = 0
        for(let index in this.randomNumbers){
            if(this.randomNumbers[index] === this.playerSelectedNumbers[index]){
                counter += 1
            }
        }
        return counter
    }

    _showPlayScore = () => {
        let numbersCount = this.randomNumbers.length
        let correctAnswerCount = this._getCorrectAnswerCount()
        let playerScoreString = `${correctAnswerCount}/${numbersCount}`
        return playerScoreString

    }
   

    _showNumbers = () => {
        let randomNumbers = this.randomNumbers
        let playerSelectedNumbers = this.playerSelectedNumbers
        //check if the two arrays have the same size befor rending
        if(randomNumbers.length === playerSelectedNumbers.length){
            let index = -1
            return randomNumbers.map( number => {
                index +=1
                if(randomNumbers[index] === playerSelectedNumbers[index]){
                    return (
                        <View style={styles.numbersContainer}>
                            <Number style={{borderColor:'green'}} value={playerSelectedNumbers[index]}/>
                        </View>
                    )
                }
                return (
                    <View style={styles.numbersContainer}>
                        <Number style={{borderColor:'#1cadff'}} value={randomNumbers[index]}/>
                        <Number style={{borderColor:'red'}} value={playerSelectedNumbers[index]}/>
                    </View>
                )
                
            })
               
            }
        }

    _playGame = () => {
        this.props.navigation.navigate('Main', {'randomSelectedNumber':this.randomSelectedNumber})
    }
     
   
    


    render(){
        console.log('check', this.randomSelectedNumber)
        
        // console.log('render')
        // console.log(this.randomNumbers, this.playerSelectedNumbers)
        
            return(
                <View style={styles.container}>
                    <StatusBar backgroundColor='#212121'/>
                    <View style={styles.header}>
                        <ScrollView 
                            horizontal={true}
                        >
                            <View ref='numbersContainer' style={styles.main}>
                                {this._showNumbers()}
                                
                            </View>
                        </ScrollView>
                        <View style={styles.scoreContainer}>
                            <Text style={styles.scoreNumber}>{this._showPlayScore()}</Text>
                        </View>
                        <View style={styles.playButtonContainer} >
                            <TouchableOpacity style={styles.playButton} onPress={this._playGame}>
                                <Ionicons name='ios-play' size={width/10} color={'#1cadff'} />

                            </TouchableOpacity>
                        </View>
                    </View>
                
                    <View style={styles.footer}>

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
        flexDirection:'row',
        backgroundColor:colors.onBackround,
        justifyContent:'center',
        padding:20,
        marginHorizontal:width/20,
        elevation:10,
    },
    title:{
        color:'#1cadff',
        fontWeight:'bold'
    },
    footer:{
        flex:.5
    },
    header:{
        flex:1,
        justifyContent:'center'
    },
    scoreContainer:{
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        margin:10
    },
    scoreNumber:{
        color:'white',
        fontSize:40,
        opacity:.3
    },
    numbersContainer:{
        justifyContent:'flex-end'
    },
    playButtonContainer:{
        justifyContent:'center',
        marginVertical:5
    },
    playButton:{
        backgroundColor:colors.onBackround,
        alignSelf:'center',
        borderRadius:60,
        width:width/4,
        height:width/4,
        justifyContent:'center',
        alignItems:'center',
        margin:5,
        elevation:10,
        flexDirection:'row',
        
    },
    play:{
        color:'white'
    }
})
