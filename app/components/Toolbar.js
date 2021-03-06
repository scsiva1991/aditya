import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';

import Fonts from '../fonts/Fonts'

export default class Toolbar extends Component {
  constructor(props){
    super(props);
  }

  static defaultProps = {
    backgroundColor : '#de9f0b',
    title : "Aditya Vidyashram",
    description: 'A Day - Cum - Residential School',
    description1: 'CBSE/AFF/2930002',
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
      <View style={[styles.toolbarContainer, {backgroundColor : this.props.backgroundColor} ]}>
        <View style={{flexDirection:'row', marginTop: (Platform.OS === 'ios') ? 20 : 0 }}>
          <Image style={{width:68, height:68}} source={require('../images/logo.png')}/>
          <View style={{justifyContent: 'center', marginRight: 4}}>
            <Text style={[styles.toolbarTitle, { color: this.props.titleColor} ]}>{this.props.title}</Text>
            <Text style={[styles.toolbarDescription, {marginTop: 2}]}>{this.props.description}</Text>
            <Text style={[styles.toolbarDescription]}>{this.props.description1}</Text>
          </View>
          <Image style={{width:68, height:68,marginRight: 4}} source={require('../images/nabet_logo.png')}/>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  toolbarContainer: {
    height: (Platform.OS === 'ios') ? 100 : 80,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  toolbarTitle:{
    fontSize: 15,
    fontFamily: Fonts.OpenSansSemibold,
  },
  toolbarDescription:{
    fontSize: 12,
    color: 'white',
    fontFamily: Fonts.OpenSansSemibold,
  },
  toolbarIcon: {
      marginTop: (Platform.OS === 'ios') ? 5 : 0
  }
});
