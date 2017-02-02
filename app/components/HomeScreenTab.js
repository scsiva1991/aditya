import React, { Component , PropTypes} from 'react';
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
  Modal,
} from 'react-native';
import Dimensions from 'Dimensions';
import {
  Actions
} from 'react-native-router-flux';


import Fonts from '../fonts/Fonts';
import Colors from '../colors/Colors';
import Constants from '../Constants';

import {
  isEmpty
} from '../util/ValidationUtils';
import {
  showAlert
} from '../util/ReactUtils';


export default class HomeScreenTab extends Component {

  static propTypes = {
    onTabSelect: PropTypes.func
  };

  constructor (props) {
    super(props)
    this.state = {
      tabItemState:[tab.nonSelectedItem, tab.nonSelectedItem, tab.nonSelectedItem, tab.nonSelectedItem],
      selectedTabPosition: Constants.tabHomeInvalid,
    };
  }


  componentWillMount(){
    this.selectTab(Constants.tabHomeVision);
  }

  selectTab = (selectedTabPosition) => {
    let tabItemState = this.state.tabItemState;
    let preivousSelectedTabPosition = this.state.selectedTabPosition;

    tabItemState.map((value, index) => {
      if (index === selectedTabPosition) {
        tabItemState[index] = tab.selectedItem;
      } else{
        tabItemState[index] = tab.nonSelectedItem;
      }
    });

    this.setState({
      tabItemState: tabItemState,
      selectedTabPosition: selectedTabPosition
    });

    //To avoid same tab selection
    if (this.props.onTabSelect && preivousSelectedTabPosition != selectedTabPosition) {
      this.props.onTabSelect(selectedTabPosition);
    }

  }


  render(){
    return(
      <View style={styles.tabContainer}>

        <View style={styles.tabItemParentContainer} >
          {this.state.tabItemState[Constants.tabHomeVision] === tab.selectedItem &&
            <View style={styles.tabItemChildContainer}>
              <TouchableWithoutFeedback onPress={() => this.selectTab(Constants.tabHomeVision)}>
                  <View style={{alignItems:'center', justifyContent:'center'}}>
                      <Image source={require('../images/ic_vision_selected.png')}/>
                      <Text style={styles.tabItemSelectedText}>Vision</Text>
                  </View>
              </TouchableWithoutFeedback>
            </View>
          }

          {this.state.tabItemState[Constants.tabHomeVision] === tab.nonSelectedItem &&
            <View style={styles.tabItemChildContainer}>
              <TouchableWithoutFeedback onPress={() => this.selectTab(Constants.tabHomeVision)}>
                  <View style={{alignItems:'center', justifyContent:'center'}}>
                      <Image source={require('../images/ic_vision.png')}/>
                      <Text style={styles.tabItemText}>Vision</Text>
                  </View>
              </TouchableWithoutFeedback>
            </View>
          }
        </View>


        <View style={styles.tabItemParentContainer} >
          {this.state.tabItemState[Constants.tabHomeContacts] === tab.selectedItem &&
            <View style={styles.tabItemChildContainer}>
              <TouchableWithoutFeedback onPress={() => this.selectTab(Constants.tabHomeContacts)}>
                  <View style={{alignItems:'center', justifyContent:'center'}}>
                      <Image source={require('../images/ic_contacts_selected.png')}/>
                      <Text style={styles.tabItemSelectedText}>Contacts</Text>
                  </View>
              </TouchableWithoutFeedback>
            </View>
          }

          {this.state.tabItemState[Constants.tabHomeContacts] === tab.nonSelectedItem &&
            <View style={styles.tabItemChildContainer}>
              <TouchableWithoutFeedback onPress={() => this.selectTab(Constants.tabHomeContacts)}>
                  <View style={{alignItems:'center', justifyContent:'center'}}>
                      <Image source={require('../images/ic_contacts.png')}/>
                      <Text style={styles.tabItemText}>Contacts</Text>
                  </View>
              </TouchableWithoutFeedback>
            </View>
          }
        </View>

        <View style={styles.tabItemParentContainer}>
          {this.state.tabItemState[Constants.tabHomeBranches] === tab.selectedItem &&
            <View style={styles.tabItemChildContainer}>
              <TouchableWithoutFeedback onPress={() => this.selectTab(Constants.tabHomeBranches)}>
                  <View style={styles.tabItemImageContent}>
                      <Image source={require('../images/ic_branches_selected.png')}/>
                      <Text style={styles.tabItemSelectedText}>Branches</Text>
                  </View>
              </TouchableWithoutFeedback>
            </View>
          }

          {this.state.tabItemState[Constants.tabHomeBranches] === tab.nonSelectedItem &&
            <View style={styles.tabItemChildContainer}>
              <TouchableWithoutFeedback onPress={() => this.selectTab(Constants.tabHomeBranches)}>
                  <View style={styles.tabItemImageContent}>
                      <Image source={require('../images/ic_branches.png')}/>
                      <Text style={styles.tabItemText}>Branches</Text>
                  </View>
              </TouchableWithoutFeedback>
            </View>
          }
        </View>


        <View style={styles.tabItemParentContainer}>
          {this.state.tabItemState[Constants.tabHomeFeedback] === tab.selectedItem &&
            <View style={styles.tabItemChildContainer}>
              <TouchableWithoutFeedback onPress={() => this.selectTab(Constants.tabHomeFeedback)}>
                  <View style={styles.tabItemImageContent}>
                      <Image source={require('../images/ic_feedback_selected.png')}/>
                      <Text style={styles.tabItemSelectedText}>Feedback</Text>
                  </View>
              </TouchableWithoutFeedback>
            </View>
          }

          {this.state.tabItemState[Constants.tabHomeFeedback] === tab.nonSelectedItem &&
            <View style={styles.tabItemChildContainer}>
              <TouchableWithoutFeedback onPress={() => this.selectTab(Constants.tabHomeFeedback)}>
                  <View style={styles.tabItemImageContent}>
                      <Image source={require('../images/ic_feedback.png')}/>
                      <Text style={styles.tabItemText}>Feedback</Text>
                  </View>
              </TouchableWithoutFeedback>
            </View>
          }
        </View>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  tabContainer: {
    flex: 3,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF'
  },
  tabItemParentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabItemChildContainer: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabItemImageContent: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabItemText:{
    color: '#BEBEBE',
    fontSize: 16,
    backgroundColor: 'transparent',
    fontFamily: Fonts.OpenSansRegular
  },
  tabItemSelectedText:{
    color: '#E8BF6F',
    fontSize: 16,
    backgroundColor: 'transparent',
    fontFamily: Fonts.OpenSansSemibold
  }
});


const tab = {
  nonSelectedItem: 0,
  selectedItem: 1
}
