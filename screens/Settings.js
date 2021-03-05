import React from 'react';
import {View, Text, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
//components
import RandomNumberSelection from '../components/RandomNumberSelection';
//colors
import colors from '../assets/colors/colors';


const Settings = () => {
	return ( 
		<View style={styles.container}>
			<View style={styles.closeModalButtonContainer}>
				<TouchableOpacity onPress={this.props.closeSettingsModal} style={styles.closeModalButton} >
					<AntDesign name='close' size={width/10} color='white'/>
				</TouchableOpacity>
			</View>
			<StatusBar backgroundColor='#212121'/>
			<View style={styles.body}>
				<View style={styles.settings}>
					<RandomNumberSelection parent={this}/>
				</View>
			</View>
		</View>
	 );

}
export default Settings;


const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.background,
    },
    closeModalButtonContainer:{
        justifyContent:'center',
        alignItems:'flex-end'
    },
    closeModalButton:{
        padding:width/20
    }, 
    body:{
        flex:1,
    }
});
