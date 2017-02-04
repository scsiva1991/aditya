import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Modal
} from 'react-native';
import Dimensions from 'Dimensions';
import {
  Actions
} from 'react-native-router-flux';


import Fonts from '../fonts/Fonts';
import Colors from '../colors/Colors';
import Constants from '../Constants';
import Toolbar from '../components/Toolbar';

import {
  isEmpty
} from '../util/ValidationUtils';
import {
  showAlert
} from '../util/ReactUtils';

import HomeScreenTab from '../components/HomeScreenTab';

import VisionTabItem from '../components/VisionTabItem';
import ContactsTabItem from '../components/ContactsTabItem';
import BranchesTabItem from '../components/BranchesTabItem';
import FeedbackTabItem from '../components/FeedbackTabItem';


export default class HomeScreen extends Component {

  constructor (props) {
    super(props)
    this.state = {
      tabItemPosition: Constants.tabHomeInvalid,
    };
  }

  onTabSelect = (selectedTabPosition) => {
      this.setState({
        tabItemPosition: selectedTabPosition
      });
  }

  onBackIconPressed = () => {
  }


  render(){
    return(
      <View style={{flex: 1, backgroundColor: '#E4E4E4'}}>
        <Toolbar backIconNeeded={true}
          onBackIconPressed={this.onBackIconPressed}>
        </Toolbar>
        <View style={styles.tabBar}>
            <HomeScreenTab ref={"homePageTab"} onTabSelect={this.onTabSelect} ></HomeScreenTab>
        </View>
        <View style={{flex:1, marginTop:1}}>
          {this.state.tabItemPosition == Constants.tabHomeVision &&
            <VisionTabItem></VisionTabItem>
          }
          {this.state.tabItemPosition == Constants.tabHomeContacts &&
            <ContactsTabItem></ContactsTabItem>
          }
          {this.state.tabItemPosition == Constants.tabHomeBranches &&
            <BranchesTabItem></BranchesTabItem>
          }
          {this.state.tabItemPosition == Constants.tabHomeFeedback &&
            <FeedbackTabItem></FeedbackTabItem>
          }
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  tabBar:{
    height:100
  }
});
