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
  TouchableOpacity
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
import Autolink from 'react-native-autolink';
import Communications from 'react-native-communications';

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
        {!isEmpty(rowData.address_line1) &&
          <Text style={[styles.content, { marginTop:8}]}>{rowData.address_line1}</Text>
        }

        {!isEmpty(rowData.address_line2) &&
          <Text style={[styles.content, { marginTop:8}]}>{rowData.address_line2}</Text>
        }

        {!isEmpty(rowData.land_mark) &&
          <Text style={[styles.content, { marginTop:8}]}>{rowData.land_mark}</Text>
        }

        {!isEmpty(city) &&
          <Text style={[styles.content, { marginTop:8}]}>{city}</Text>
        }

        {!isEmpty(rowData.phone) &&
          <Autolink style={[styles.content, { marginTop:8}]} text={rowData.phone} phone={true}/>
        }

        {!isEmpty(rowData.cell) &&
          <Autolink style={[styles.content, { marginTop:8}]} text={rowData.cell} phone={true} />
        }

        {!isEmpty(rowData.email) &&
            <Autolink style={[styles.content, { marginTop:8}]} text={rowData.email} />
        }

        <View style={{height: 8}}></View>
      </View>
    )
  }


  render(){
    return(
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>

      {(!this.state.loaderVisible && this.state.dataSource.getRowCount()>0) &&
            <View>
              <ListView style={{paddingTop: 16}} showsVerticalScrollIndicator={false}
                dataSource={this.state.dataSource}
                enableEmptySections={true}
                keyboardDismissMode="on-drag"
                renderRow={this._renderRow}
                renderSeparator={this._renderSeparator}
              />

              <View style={{alignItems:"center",justifyContent:'center', flexDirection: 'column'}}>
                <Text style={styles.content} >Follow Us</Text>
                <TouchableOpacity style={{marginTop: 8}} onPress={()=>{
                    Communications.web('https://www.facebook.com/adityavidyashram/')
                }}>
                  <Image style={{width:50, height:50}} source={require('../images/facebook.png')}/>
                </TouchableOpacity>
                <View style={{height: 8}}/>
              </View>

            </View>


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
