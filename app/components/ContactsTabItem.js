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
  ListView
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

export default class ContactsTabItem extends Component {

  constructor (props) {
    super(props)
    const contactsList = [];
    const rowHasChanged = (r1, r2) => r1 !== r2;
    const ds = new ListView.DataSource({rowHasChanged});
    (this: any)._renderRow = this._renderRow.bind(this);
    (this: any)._renderSeparator = this._renderSeparator.bind(this);
    this.state = {
      loaderVisible:true,
      retryOptionVisible:false,
      dataSource: ds.cloneWithRows(contactsList),
    };
  }

  componentWillMount(){
    this.getContacts();
  }

  componentDidMount(){
    this._isMounted = true;
  }


  componentWillUnmount(){
    this._isMounted = false;
  }

  retry(){
    this.setState({ retryOptionVisible: false });
    this.getContacts();
  }


  getContacts() {
    const _this = this;
    _this.setState({ loaderVisible: true, retryOptionVisible: false });
    StorageUtils.getJsonObject(StorageUtils.key_contacts, (result) => {
      console.log(result);
      if(result !== undefined && result !== null && result.length > 0){
        _this.setState({
           contactsList: result,
           dataSource: _this.state.dataSource.cloneWithRows(result)
        });
        this.setState({
            loaderVisible: false
        });
        DetailsService.getContacts(()=>{
        }, (error, response) => {
          if(_this._isMounted){
            if(error){
            }else{
              _this.setState({
                 contactsList: response,
                 dataSource: _this.state.dataSource.cloneWithRows(response)
              });
            }
          }
        });
      }else {
        DetailsService.getContacts(()=>{
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
                 contactsList: response,
                 dataSource: _this.state.dataSource.cloneWithRows(response)
              });
            }
          }
        });
      }
    });
  }


  _renderSeparator (sectionID, rowID) {
    return (
            <View key={rowID} >
            </View>
    );
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


  render(){
    return(
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>

      {(!this.state.loaderVisible && this.state.dataSource.getRowCount()>0) &&
            <ListView style={{flex:1, paddingTop: 16}} showsVerticalScrollIndicator={false}
              dataSource={this.state.dataSource}
              enableEmptySections={true}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps={'always'}
              renderRow={this._renderRow}
              renderSeparator={this._renderSeparator}
            />
        }

        {(!this.state.loaderVisible && this.state.dataSource.getRowCount()==0) &&
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
});
