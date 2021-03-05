import React from 'react'
import {StyleSheet, View, Text, Dimensions} from 'react-native';

const Number = () => {
	return(
		<View style={[styles.container, {...this.props.style}]}>
			<Text style={styles.value}>{this.props.value}</Text>
		</View>
	)

}
export default Number;

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
        padding:0,
        borderColor:'white',
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        width:width/6,
        height:width/6,
        marginRight:10,
        marginVertical:10,
    },
    value:{
        color:'white',
        fontWeight:'bold',
        fontSize:40
    }
});

