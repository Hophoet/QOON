import React from 'react'
import {StyleSheet, View, ScrollView, StatusBar, TextInput, Text, Dimensions, TouchableOpacity} from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons"

import colors from '../assets/colors/colors'
//components
import Number from '../components/Number'
import { color } from 'react-native-reanimated'
import CheckLoader from '../components/animations/CheckLoader'

export default class  Main extends React.Component{
    constructor(props){
        super(props)
        //get the random numbers selection number from the navigation parameters
        this.randomSelectedNumber = this.props.navigation.state.params.randomSelectedNumber
        //set the random numbers empty array
        this.numbers = []
        //set the state of the timer (show or not)
        this.timerIsShow = false
        //set the random number state (show or not)
        this.randomNumberIsShow = true
        //the screen state
        this.state = {
            //player selected number(in on time)
            number: {},
            //all the player selected numbers
            playerSelectedNumbers:[],
            //the player selecting textinput value
            textInputValue:'',
            //Player selection state (end or not)
            isPlayerFinishedSelectingNumbers:false,
            //checkingLoader
            checkingLoading: false
           
            
        }
    }

    //method to get the timer current value
    _showTimer = () => {
        //condition on the timer state before the getting
        if(this.timerIsShow){
            return  this.state.timer
        }
    }

    //method to set or initialize the timer value
    _fillTimer = (value) => {
       console.log('TIMER IS SHOW', this.timerIsShow)
       //set the random number showing state to true(enable)
        if(!this.randomNumberIsShow){
            this.randomNumberIsShow = true
        }
        //checking the existence of the timer 
        if(this.state.timer == null){ 
            // console.log('SETTING THE TIMER...')
            //intializing the timer value
            this.setState({timer:value})
            //generation a random number
            let randomNumber = parseInt(Math.random()*100)
            //buting the generated random number into the random numbers array
            this.numbers.push(randomNumber)
            //set the number state to the current getting random number
            this.setState({number:{value:randomNumber}})
        }
        //setting the timer itervale as attribute (interval)
        this.interval = setInterval( () => {
            console.log('RUNNING TIMER.....', this.state.timer)
            //checking if the timer is > to 1 before 
            //decreasing is value to avoid 0 showing as value case
            if(this.state.timer >1)
            this.setState({timer:this.state.timer - 1})
            //timer value egale to 0 case (=> inititalize the timer by the initial value)
            else{
                //getting the generated random number
                let randomNumber = parseInt(Math.random()*100)
                //put the random number to the randoms numbers array
                this.numbers.push(randomNumber)
                //re initialize the timer by the initial value
                this.setState({timer:value})
                //set the random number to the state 
                this.setState({number:{value:randomNumber}})
                

            }
        },//set the timer callback function to 1 second(100 milliseconds) 
        1000)


    }

    //method for the number component rendering...
    _showNumber = () => {
        //check the existencd of the rendering value and his state
        if(this.state.number.value && this.randomNumberIsShow){
            return (
                <Number value={this.state.number.value}/>
            )
        }
    }

    //random numbers array size tracker method
    _trackerRandomNumber = (size) => {
        // condition for the end of the random number generation
        if(this.numbers.length === size && this.state.timer === 1){

            //condition on the before the end of the last second for the end
            if(!this.state.done){
                console.log("DONE SETTED")
                //cleaning the timer intervale
                clearInterval(this.interval)
                //set the last second timer for the last random generated number
                setTimeout( () => {
                    //set the timer showing state to false(deseable)
                    this.timerIsShow = false
                    //deseable the random number showing state
                    this.randomNumberIsShow = false
                    //set the done state for the last class of the timer (onsecond)
                    this.setState({done:true})
                    console.log('DISEABLE TIMER')
                },//set the last second of the last random number to 1 second 
                1000)
                
            }
           
        }
    }


    

    //call after components did mount
    componentDidMount(){
        //set the timer after components did mount
        this._fillTimer(2)
    }
    componentWillUnmount(){
        
    }

    //method to check the validation of the player selected number
    //to avoid bugs
    _isPlayerSelectedNumberValids = (number) => {
        let playerSelectedNumber = number.trim()
        // check the size of the player input number
        if(playerSelectedNumber.length > 0 && playerSelectedNumber.length <3){
            if(playerSelectedNumber.length == 2){
                let isCorrectFormat =playerSelectedNumber[0] != '.' && playerSelectedNumber[0] != ',' && playerSelectedNumber[1] != '.' && playerSelectedNumber[1] != ',' && playerSelectedNumber[1] != '-'
                console.log('isCorrectFormat', isCorrectFormat)
                if(isCorrectFormat)
                    return true 
                return false
            }
            else {
                let isCorrectFormat =playerSelectedNumber[0] != '.' && playerSelectedNumber[0] != ',' && playerSelectedNumber[0] != '-'
                console.log('isCorrectFormat', isCorrectFormat)
                if(isCorrectFormat)
                    return true 
                return false
            }
         
            //cast the player input to an integer
            playerSelectedNumber = parseInt(playerSelectedNumber)
            console.log('VALUE', playerSelectedNumber)
            //check the get value from the casting 
            if(playerSelectedNumber){
                return true
            }
            else if (playerSelectedNumber === 0){
                return true
            }
          
            
        }
        return false
    }

    //method to add the player input value
    _addPlayerSelectedNumber = () => {
        //get of the input value (number)
        let number = this.state.textInputValue
        //check the validation of the player input value
        if(this._isPlayerSelectedNumberValids(number)){
            //Valid case
            
            number = number.trim()
            //check number of selected numbers
            if(this.state.playerSelectedNumbers.length < this.randomSelectedNumber){
                //cloning og the player selected numbers array
                let playerSelectedNumbers = [...this.state.playerSelectedNumbers]
                //push the selected number into the number
                playerSelectedNumbers.push(number)
                this.setState({playerSelectedNumbers})
                //reset the text input value to an empty string
                this.setState({textInputValue:''})
                //scroll the the end of the selected numbers list
                this.refs.playSelectedNumbersScollView.scrollToEnd()
                //user finished selecting numbers case
                if(playerSelectedNumbers.length === this.randomSelectedNumber){
                    //user finished lecting numbers
                    this.setState({isPlayerFinishedSelectingNumbers:true})
                }
            }
            else{
                // NOTHING YET TODO
                
            }
        }
        else{
            // NOTHING YET TODO
        }
  
    }
    
    
    //method to render the user selected number components
    _showPlayerSelectedNumbers = (numbers) => {
        // check the arrays state
        //if empty , then we render a default square component with (_ _)
        //meaning waiting for his selected number
        if(numbers.length === 0){
            return (
                <View style={styles.playSelectedNumberContainer}>
                <Number value={'_ _'}/>
            </View>
            )
        }
        //return the numbers if they exist
        return numbers.map(number => {
            let num = Math.random()
            return (
            <View key={number+num} style={styles.playSelectedNumberContainer}>
                <Number value={number}/>
            </View>
                )}
        )
         
    }

    //method for the checking button showing management
    _showCheckingButton =  () => {
        if(this.state.isPlayerFinishedSelectingNumbers){
            if(this.state.checkingLoading){
                return (
                    <View>
                        <CheckLoader color={'white'}/>
                    </View>
                )
            }
            return (
                <View>
                    <TouchableOpacity style={styles.checkButton} onPress={this._checkValidation}>
                        <Ionicons name='ios-settings' size={width/10} color={'#1cadff'}/>
                        <Text style={styles.checkButtonText}>Check</Text>
                    </TouchableOpacity>
                </View>
           
            )
        }
    }

    //method for the player textinput after the random numbers
    //to allowed the player to choose his numbers
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

    //method to start the numbers checking
    _checkValidation = () =>  {
        this.setState({checkingLoading: true})
        //navigation to the checking screen with the numbers (randoms numbers, and the player selected numbers)
        setTimeout(() => {
            this.props.navigation.navigate('Check',{'randomSelectedNumber':this.randomSelectedNumber, numbers:{randomNumbers:this.numbers, playerSelectedNumbers:this.state.playerSelectedNumbers}})
            this.setState({checkingLoading:false})

        }, this.props.navigation.state.params.randomSelectedNumber*1000)
    }

    _showIndicator = () => {
        if(!this.state.isPlayerFinishedSelectingNumbers){

            return (
                <View style={styles.indicatorContainer}>
                        <Text style={styles.indicatorText}>Remember the numbers in the order </Text>
                </View>
            )
        }
    }

    _showInputState = () => {
        return(
            <View style={styles.inputStateContainer}>
                <Text style={styles.inputState}>{this.state.playerSelectedNumbers.length}/{this.randomSelectedNumber}</Text>
            </View>
        )
    }



    render(){
        // console.log('MAIN RENDER')
        console.log('PARAMS', this.props.navigation.state.params.randomSelectedNumber)
        //Call of the random numbers array size tracking method
        this._trackerRandomNumber(this.randomSelectedNumber)
        //render of the random numbers generetion step components
        if(!this.state.done){
            return(
                <View style={styles.container}>
                    <StatusBar backgroundColor='#212121'/>
                    <View style={styles.header}>
                   
                        <View  style={styles.main}>
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
        //render the player numbers selection step
        return (
            <View style={styles.container}>
            <StatusBar backgroundColor='#212121'/>
            <View style={styles.selectionHeader}>
                { this._showIndicator()}
                <ScrollView 
                    ref={'playSelectedNumbersScollView'}
                    horizontal={true}
                    bounces={true}
                >
                <View style={styles.SelectionMain}>
                    {this._showPlayerSelectedNumbers(this.state.playerSelectedNumbers)}
                </View>
                </ScrollView>
                { this._showInputState()}
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
    // render(){
    //     return (
    //     <View>
    //         <TouchableOpacity style={styles.checkButton} onPress={this._checkValidation}>
    //             <Ionicons name='ios-settings' size={width/10} color={'#1cadff'}/>
    //             <Text style={styles.checkButtonText}>Check</Text>
    //         </TouchableOpacity>
    //     </View>
    //     )
    // }
}

//get the dynamic with and height for the mobile phone window
const {width, height} = Dimensions.get('window')


//setting the style with StyleSheet API
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

    },
    selectionHeader:{
        // backgroundColor:'gray',
        // flex:1,
        justifyContent:'center',
        alignItems:'center'        
    }
    ,
    SelectionMain:{
        flexDirection:'row',
        backgroundColor:colors.onBackround,
        justifyContent:'center',
        alignItems:'center',
        padding:20,
        marginHorizontal:width/20,
        elevation:10,
        // height:width/4,
        // backgroundColor:'red',
        flex:1,
        // width:width,
        // alignSelf:'center',
        
        
    },
    title:{
        color:'#1cadff',
        fontWeight:'bold'
    },
    footer:{
        // backgroundColor:'',
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
        backgroundColor:colors.onBackround,
        paddingVertical:10,
        paddingHorizontal:20,
        elevation:5,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'


    },
    checkButtonText:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',

    },
    playSelectedNumberContainer:{
      
        justifyContent:'center',
        alignItems:'center',
    },
    indicatorContainer:{
        padding:10,
        justifyContent:'center',
        alignItems:'center'
    },
    indicatorText:{
        color:'white',
        fontSize:20,

    },
    inputStateContainer:{
        // backgroundColor:'gray',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        margin:10
    },
    inputState:{
        color:'white',
        fontSize:40,
        opacity:.3
    },
})