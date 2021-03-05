import React from 'react'
import {StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons"
import colors from '../../assets/colors/colors'

const Setting = () => {
	return(
		<TouchableOpacity onPress={this.props.openSettingsModal} style={[styles.container]} >
			<Ionicons name='ios-settings' size={width/10} color='white' />
		</TouchableOpacity>
	)

}
export default Setting;

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
        top:0,
        right:0,
        position:'absolute',
        margin:width/20
    }
});
