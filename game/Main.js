import React from 'react'
import {StyleSheet, View, StatusBar, TextInput, Text, Dimensions, TouchableOpacity} from 'react-native'
import {Entypo, Ionicons} from '@expo/vector-icons'
import colors from './colors/colors'
//components
import Number from './components/Number'
import { color } from 'react-native-reanimated'
export default class  Main extends React.Component{
    constructor(props){
        super(props)
        this.numbers = []
        // this.playSelectedNumbers = []
        this.playerSelectedNumber = ''
        this.timerIsShow = true
        this.randomNumberIsShow = true
        this.state = {
            number: {},
            playerSelectedNumbers:[],
            textInputValue:'',
            isPlayerFinishedSelectingNumbers:false
            
        }
    }

    _showTimer = () => {
        return  this.timerIsShow && this.state.timer
    }

    _fillTimer = (value) => {
        //enable the timer show
        if(!this.timerIsShow){
            this.timerIsShow = true
        }
        if(!this.randomNUmberIsShow){
            this.randomNumberIsShow = true
        }
        if(this.state.timer == null){ 
            this.setState({timer:value})
            let randomNumber = parseInt(Math.random()*100)
            this.numbers.push(randomNumber)
            this.setState({number:{value:randomNumber}})
        }
        this.interval = setInterval( () => {
            if(this.state.timer >1)
            this.setState({timer:this.state.timer - 1})
   
            else{
                let randomNumber = parseInt(Math.random()*100)
                this.numbers.push(randomNumber)
                if(this.numbers.length != 2){
                    this.setState({timer:value})
            
                    this.setState({number:{value:randomNumber}})
                }
                else{
                    console.log("OK")
                    this.setState({timer:value})
         
                    this.setState({number:{value:randomNumber}})
                }

            }
        }, 1000)


    }

    _showNumber = () => {
        if(this.state.number.value && this.randomNumberIsShow){
            return (
                <Number value={this.state.number.value}/>
            )
        }
    }

    _trackerRandomNumber = (size) => {
        // console.log(this.numbers)
        if(this.numbers.length === size && this.state.timer === 1){
  
       
            // this.timerIsShow = false
            // this.setState({timer:1})
            if(!this.state.done){
                console.log("DONE SETTED")
                clearInterval(this.interval)
                setTimeout( () => {
                    this.timerIsShow = false
                    this.randomNumberIsShow = false
                    this.setState({done:true})
                    console.log('DISEABLE TIMER')
                }, 1000)
                
            }
           
        }
    }


    _fillNumber = () => {
        let setinterval = setInterval( () => {
            let randomNumber = parseInt(Math.random()*100)
            this.numbers.push(randomNumber)
            this.setState({number:{value:randomNumber}})
            // console.log('call')
        }, 7000)
        // setinterval.
    }

    

    
    componentDidMount(){
        this._fillTimer(2)
    }

    _isPlayerSelectedNumberValids = (number) => {
        let playerSelectedNumber = number.trim()
        // console.log(playerSelectedNumber, playerSelectedNumber.length)
        if(playerSelectedNumber.length > 0 && playerSelectedNumber.length <3){

            playerSelectedNumber = parseInt(playerSelectedNumber)
            if(playerSelectedNumber){
                return true
            }
        }
        return false
    }

    
    _addPlayerSelectedNumber = () => {
        let number = this.state.textInputValue
        if(this._isPlayerSelectedNumberValids(number)){
            // console.log('VALID')

            //check number of selected numbers
            if(this.state.playerSelectedNumbers.length < 4){
                let playerSelectedNumbers = [...this.state.playerSelectedNumbers]
                playerSelectedNumbers.push(number)
                this.setState({playerSelectedNumbers})
                this.setState({textInputValue:''})

                //user finished selecting numbers case
                if(playerSelectedNumbers.length === 4){
                    //user finished lecting numbers
                    this.setState({isPlayerFinishedSelectingNumbers:true})
                }
            }
            else{
                
                
            }
            // console.log(this.refs.textInput)
            // this.refs.textInput.focus()
            // this.refs.textInput.autoFocus = true
            // console.log(playerSelectedNumbers)
        }
        else{
            // console.log('NOT VALID')
        }
  
    }
    
    

    _showPlayerSelectedNumbers = (numbers) => {
        // console.log('numbers', numbers)
        return numbers.map(number => (
                <Number value={number}/>
                )
        )
         
    }

    _showCheckingButton =  () => {
        if(this.state.isPlayerFinishedSelectingNumbers){
            return (
                <TouchableOpacity style={styles.checkButton} onPress={this._checkValidation}>
                        <Text style={styles.checkButtonText}>Check</Text>
                </TouchableOpacity>
            )
        }
    }

    _showPlayerSelectingTextInput = () => {
        if(!this.state.isPlayerFinishedSelectingNumbers){
            return (
                <TextInput 
                value={this.state.textInputValue}
                ref={'textInput'}
                autoFocus={true}
                style={styles.textInput} 
                placeholder=""
                placeholderTextColor='white'
                selectionColor='white'
                keyboardType='numeric'
                blurOnSubmit={false}
                onChangeText={(text)=>{
                    this.setState({textInputValue:text})
                    // his.playerSelectedNumber = text
                }}
                onSubmitEditing={this._addPlayerSelectedNumber}
                />
            )
        }
    }

    _checkValidation = () =>  {
        this.props.navigation.navigate('Check',{numbers:{randomNumbers:this.numbers, playerSelectedNumbers:this.state.playerSelectedNumbers}})
    }


    render(){
        console.log('render')
        this._trackerRandomNumber(4)
        if(!this.state.done){
            return(
                <View style={styles.container}>
                    <StatusBar backgroundColor='#212121'/>
                    <View style={styles.header}>
                        <View ref='numbersContainer' style={styles.main}>
                            {this._showNumber()}
                        </View>
                        <View style={styles.timerContainer}>
                            <Text style={styles.timerNumber}>{this._showTimer()}</Text>
                        </View>
                    </View>
                
                    <View style={styles.footer}>

                    </View>
                </View>
            )
        }
        return (
            <View style={styles.container}>
            <StatusBar backgroundColor='#212121'/>
            <View style={styles.header}>
                <View ref='numbersContainer' style={styles.main}>
                    {this._showPlayerSelectedNumbers(this.state.playerSelectedNumbers)}
                </View>
                <View style={styles.textInputContainer}>
                    {this._showPlayerSelectingTextInput()}
                </View>
                <View style={styles.checkButtonContainer}>
                    {this._showCheckingButton()}
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
        alignItems:'center',
        padding:20,
        marginHorizontal:width/20,
        // borderRadius:5,
        elevation:10,
        height:width/4,
        
        
    },
    title:{
        color:'#1cadff',
        fontWeight:'bold'
    },
    footer:{
        // backgroundColor:'red',
        flex:.5
    },
    header:{
        // backgroundColor:'gray',
        flex:1,
        justifyContent:'center'
    },
    timerContainer:{
        // backgroundColor:'gray',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        margin:10
    },
    timerNumber:{
        color:'white',
        fontSize:40,
        opacity:.3
    },
    textInputContainer:{
        // backgroundColor:'red',
        alignSelf:'center',
        margin:10
        
    },
    textInput:{
        borderWidth:2,
        borderColor:'white',
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        color:'white',
        fontSize:30
    },
    checkButtonContainer:{
        // backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:10,
    },
    checkButton:{
        backgroundColor:'#1cadff',
        paddingVertical:10,
        paddingHorizontal:20,


    },
    checkButtonText:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',

    }
})