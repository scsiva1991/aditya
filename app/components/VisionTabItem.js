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
  Modal,
  ListView,
  ScrollView
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

import DetailsService from '../api/service/DetailsService';
import RetryLoader from '../components/RetryLoader';
import StorageUtils from '../util/StorageUtils';

export default class VisionTabItem extends Component {

  constructor (props) {
    super(props)
    this.state = {
      loaderVisible:true,
      retryOptionVisible:false,
      result: null,
    };
  }

  componentWillMount(){
    this.getVisionAndMission();
  }

  componentDidMount(){
    this._isMounted = true;
  }


  componentWillUnmount(){
    this._isMounted = false;
  }

  retry(){
    this.setState({ retryOptionVisible: false });
    this.getVisionAndMission();
  }


  getVisionAndMission() {
    const _this = this;
    _this.setState({ loaderVisible: true, retryOptionVisible: false });
    StorageUtils.getJsonObject(StorageUtils.key_vision, (result) => {
      console.log(result);
      if(result !== undefined && result !== null){
        _this.setState({
           result: result,
        });
        this.setState({
            loaderVisible: false
        });
        DetailsService.getVisionAndMission(()=>{
        }, (error, response) => {
          if(_this._isMounted){
            if(error){
            }else{
              _this.setState({
                 result: response,
              });
            }
          }
        });
      }else {
        DetailsService.getVisionAndMission(()=>{
        }, (error, response) => {
          if(_this._isMounted){
            if(error){
              _this.setState({
                  retryOptionVisible: true
              });
            }else{
              this.setState({
                  loaderVisible: false
              });
              _this.setState({
                 result: response,
              });
            }
          }
        });
      }
    });
  }



  _renderRow (rowData, sectionID, rowID) {
    let onRowItemClick = () => {
    }
    let city = rowData.city;
    if(!isEmpty(rowData.pincode)){
      city = city + " - " + rowData.pincode;
    }
    return (
      <View style={{marginLeft:16,marginRight:16, paddingBottom:16}}>
        <Text style={styles.header}>{rowData.name}</Text>
        <Text style={[styles.content, { marginTop:8}]}>{rowData.street}</Text>
        <Text style={[styles.content, { marginTop:8}]}>
          {city}
        </Text>
        <Text style={[styles.content, { marginTop:8}]}>{rowData.phone}</Text>
        <Text style={[styles.content, { marginTop:8}]}>{rowData.email}</Text>
        <View style={{height: 8}}></View>
      </View>
    )
  }

  renderMissionItems = (obj, index) => {
    return (
      <Text key={index} style={[styles.content, { marginTop:8}]}>
        <Text style={styles.contentBullet}>
          {"\u2022"}
        </Text>
        {" "+ obj}
      </Text>
    );
  }

  renderVisionItems = (obj, index) => {
    return (
      <Text key={index} style={[styles.content, { marginTop:8}]}>{obj}</Text>
    );
  }


  render(){
    return(
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>

      {(!this.state.loaderVisible && this.state.result) &&
            <ScrollView showsVerticalScrollIndicator={false} style={{padding:12}}>
              <View style={{flex:1}}>
                  <Text style={[styles.header, { marginTop:8}]}>Vision</Text>
                  {this.state.result.vision.map((obj, index) => {
                    return this.renderVisionItems(obj, index)
                    })
                  }
                  <View style={{ marginTop:8, justifyContent:'center', alignItems:'center'}}>
                    <Image source={require('../images/samrakshana.jpg')}/>
                  </View>
                  <Text style={[styles.header, { marginTop:8}]}>Mission</Text>
                  {this.state.result.mission.map((obj, index) => {
                    return this.renderMissionItems(obj, index)
                    })
                  }
                  <View style={{height: 50}}/>
              </View>
            </ScrollView>
        }

        {(!this.state.loaderVisible && !this.state.result) &&
          <View style={{flex:1, justifyContent:'center'}}>
            <Text style={styles.noResultText}>No records found</Text>
          </View>
        }

        {this.state.loaderVisible &&
          <RetryLoader
            retryOptionVisible={this.state.retryOptionVisible}
            loadingContentBackgroundColor={'#F0F0F2'}
            onRetry= {this.retry.bind(this)}
          />
        }

      </View>
    );
  }

}

const styles = StyleSheet.create({
  divider: {
    height: 16,
    backgroundColor: 'transparent'
  },
  noResultText: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
    fontFamily: Fonts.OpenSansRegular
  },
  header: {
    fontSize: 18,
    color: '#de9f0b',
    fontFamily: Fonts.OpenSansSemibold
  },
  content: {
    fontSize: 15,
    color: '#000000',
    fontFamily: Fonts.OpenSansRegular
  },
  contentBullet: {
    fontSize: 20,
    color: '#000000',
    fontFamily: Fonts.OpenSansRegular
  }
});
