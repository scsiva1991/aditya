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
      <View style={[styles.toolbarContainer, { backgroundColor : this.props.backgroundColor} ]}>
        <View style={{flex:1,flexDirection:'row', justifyContent: 'center', alignItems:'center'}}>
          {this.props.backIconNeeded === true  &&
            <TouchableOpacity style={[styles.toolbarIcon,{paddingLeft:16,paddingRight:8}]} onPress={this.onBackIconPressed}>
              <Image style={{width:60, height:60}} source={require('../images/logo.png')}/>
            </TouchableOpacity>
          }
          <Text style={[styles.toolbarTitle, { color: this.props.titleColor} ]}>{this.props.title}</Text>
          {this.props.rightMenuIconNeeded=== true  &&
            <TouchableOpacity style={[styles.toolbarIcon,{paddingLeft:16,paddingRight:8}]} onPress={this.onHomeIconPressed}>
              <Image source={require('../images/logo.png')}/>
            </TouchableOpacity>
          }
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  toolbarContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  toolbarTitle:{
    fontSize: 22,
    flex:1,
    fontFamily: Fonts.OpenSansRegular,
    textAlign: 'center'
  },
  toolbarIcon: {
      marginTop: (Platform.OS === 'ios') ? 5 : 0
  }
});
