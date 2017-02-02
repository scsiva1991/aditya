import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
  BackAndroid,
  StatusBar,
  Navigator
} from 'react-native';
import {
  Scene,
  Router,
  ActionConst,
  Actions
} from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen'

import HomeScreen from './layout/HomeScreen';

import {
  goToHome
} from './util/ReactUtils';
import {
  isEmpty
} from './util/ValidationUtils';

export default class App extends Component{

  constructor(props){
    super(props);
    StatusBar.setBackgroundColor('#555555',false);
  }

  componentWillMount(){
    /*StorageUtils.getJsonObject(StorageUtils.key_login, (result) => {
      if(result !== undefined && result !== null && !isEmpty(result.mobile)){
        Actions.home();
      }
      setTimeout(() => {SplashScreen.hide();} ,1000);
    });*/
  }

  componentDidMount(){
    setTimeout(() => {SplashScreen.hide();} ,1000);
  }

  backAndroidHandler = () => {
    if (!Actions.get('placesList')){
        this.showExitAlert();
        return true;
    } else{
      Actions.pop();
      return true;
    }
  }

  showExitAlert(){
    Alert.alert(
      'Exit',
      'Are you sure you want to exit?',
      [
        {text: 'No', onPress: () => {}},
        {text: 'Yes', onPress: () => {
          BackAndroid.exitApp();
        }},
      ]
    )
  }

  render(){
    return(
      <Router backAndroidHandler={this.backAndroidHandler}>
        <Scene key="root">
          <Scene key="home" component={HomeScreen} hideNavBar={true} initial={true} type={ActionConst.REPLACE}/>
        </Scene>
      </Router>
    );
  }

}
