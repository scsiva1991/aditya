import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity
} from 'react-native';

import Fonts from '../fonts/Fonts'

export default class Toolbar extends Component {
  constructor(props){
    super(props);
  }

  static defaultProps = {
    backgroundColor : '#de9f0b',
    title : "Aditya Vidyashram",
    description: 'A Day - Cum - Residential School CBSE/AFF/2930002',
    titleColor: 'white',
    backIconNeeded: false,
    rightMenuIconNeeded: false,
  }

  onBackIconPressed = () => {
    if(this.props.onBackIconPressed){
      this.props.onBackIconPressed();
    }
  }

  onHomeIconPressed = () => {
    if(this.props.onHomeIconPressed){
      this.props.onHomeIconPressed();
    }
  }

  render(){
    return(
      <View style={[styles.toolbarContainer, { justifyContent: 'center', alignItems:'center', backgroundColor : this.props.backgroundColor} ]}>
        <View style={{flexDirection:'row'}}>
          <Image style={{width:100, height:100}} source={require('../images/logo.png')}/>
          <View style={{justifyContent: 'center'}}>
            <Text style={[styles.toolbarTitle, { color: this.props.titleColor} ]}>{this.props.title}</Text>
            <Text style={[styles.toolbarDescription]}>{this.props.description}</Text>
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  toolbarContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  toolbarTitle:{
    fontSize: 14,
    fontFamily: Fonts.OpenSansSemibold,
  },
  toolbarDescription:{
    fontSize: 12,
    fontFamily: Fonts.OpenSansSemibold,
    color: 'white'
  },
  toolbarIcon: {
      marginTop: (Platform.OS === 'ios') ? 5 : 0
  }
});
