import React from 'react'
import {StyleSheet, View, Image, Dimensions, Modal, StatusBar, Text, TouchableOpacity} from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons"
import F from "react-native-vector-icons/Fontisto"
import colors from '../assets/colors/colors'
//screens
import Settings from './Settings'

import SettingsButton from '../components/settings/SettingsButton'
export default class  Main extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            settingsModalIsVisible:false,
            randomSelectedNumber: 4,
        }
    }

    minusRandomSelectedNumber = () => {
        if(this.state.randomSelectedNumber >= 5){
            this.setState({randomSelectedNumber: this.state.randomSelectedNumber -1})
       
        }
    }

    plusRandomSelectedNumber = () => {
        this.setState({randomSelectedNumber: this.state.randomSelectedNumber +1})
    }

  //GOOMA
    _play = () => {
        // alert('PLAY')
        this.props.navigation.navigate('Main', {'randomSelectedNumber':this.state.randomSelectedNumber})
    }

    toggleSettingsModal = () => {
        this.setState({settingsModalIsVisible:!this.state.settingsModalIsVisible})
    }

    closeSettingsModal = () => {
        this.setState({settingsModalIsVisible:false})
    }
    
    openSettingsModal = () => {
        this.setState({settingsModalIsVisible:true})
    }

    changeRandomSelectedNumber = (number) => {
        this.setState({randomSelectedNumber:number})
    }

    render(){
        return(
            <View style={styles.container}>
                <StatusBar backgroundColor='#212121'/>
                <Modal
                    animationType='slide'
                    onRequestClose={this.closeSettingModal}
                    animated={true}
                    visible={this.state.settingsModalIsVisible}
                >
                    <Settings 
                        minusRandomSelectedNumber={this.minusRandomSelectedNumber} 
                        plusRandomSelectedNumber={this.plusRandomSelectedNumber}   
                        randomSelectedNumber={this.state.randomSelectedNumber}  
                        closeSettingsModal={() => this.closeSettingsModal()}
                    />
                </Modal>
                <SettingsButton 
                    openSettingsModal={() => this.openSettingsModal()}
                />
                <View style={styles.main}>
                    <Text style={styles.title}>QOON</Text>
                    <Text style={styles.description}>Train your
                        <Text style={styles.brainText}> Brain </Text>
                     by playing</Text>
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
        width:width/4,
        height:width/4,
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
    play:{
        color:'white',
    },
    title:{
        color:'#1cadff',
        fontWeight:'bold',
        fontSize:30
    },
    description:{
        color:'white',
        // textTransform:'lowercase'
    },
    brainImage:{
        width:Dimensions.get('window').width/2,
        height:Dimensions.get('window').width/2,
    },
    brainText:{
        fontWeight:'bold',
        color:'#1cadff',
        fontSize:17
    }
})