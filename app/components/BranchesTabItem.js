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

export default class BranchesTabItem extends Component {

  constructor (props) {
    super(props)
    const branchesList = [];
    const rowHasChanged = (r1, r2) => r1 !== r2;
    const ds = new ListView.DataSource({rowHasChanged});
    (this: any)._renderRow = this._renderRow.bind(this);
    (this: any)._renderSeparator = this._renderSeparator.bind(this);
    this.state = {
      loaderVisible:true,
      retryOptionVisible:false,
      dataSource: ds.cloneWithRows(branchesList),
    };
  }

  componentWillMount(){
    this.getBranches();
  }

  componentDidMount(){
    this._isMounted = true;
  }


  componentWillUnmount(){
    this._isMounted = false;
  }

  retry(){
    this.setState({ retryOptionVisible: false });
    this.getBranches();
  }


  getBranches() {
    const _this = this;
    _this.setState({ loaderVisible: true, retryOptionVisible: false });
    StorageUtils.getJsonObject(StorageUtils.key_branches, (result) => {
      console.log(result);
      if(result !== undefined && result !== null && result.length > 0){
        _this.setState({
           branchesList: result,
           dataSource: _this.state.dataSource.cloneWithRows(result)
        });
        this.setState({
            loaderVisible: false
        });
        DetailsService.getBranches(()=>{
        }, (error, response) => {
          if(_this._isMounted){
            if(error){
            }else{
              _this.setState({
                 branchesList: response,
                 dataSource: _this.state.dataSource.cloneWithRows(response)
              });
            }
          }
        });
      }else {
        DetailsService.getBranches(()=>{
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
                 branchesList: response,
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
      let branchesList = this.state.branchesList;
      let branchesListNew = [];
      if(branchesList){
        let symbolObj = rowData;
        branchesList.forEach((item) => {
            item = {
              ...item,
              isSelected: false,
            }
          branchesListNew.push(item);
        });
        if(rowData.isSelected){
          branchesListNew[rowID].isSelected = !rowData.isSelected;
        } else {
            branchesListNew[rowID].isSelected = true;
        }

        this.setState({
          branchesList: branchesListNew,
          dataSource: this.state.dataSource.cloneWithRows(branchesListNew)
        });
      }
    }

    let city = rowData.city;
    if(!isEmpty(rowData.pincode)){
      city = city + " - " + rowData.pincode;
    }
    return (
      <View style={{marginLeft:16,marginRight:16, paddingBottom:16}}>

        <TouchableWithoutFeedback onPress ={onRowItemClick} underlayColor={"#9C389C"}>
          <View style={styles.card}>
            <View style={{flexDirection: 'row', padding:16, paddingTop:24, paddingBottom:16}}>
                <Text style={[styles.cardHeader, { marginRight: 8, flex:1.8}]}>{rowData.title}</Text>
                <View style={{flex:0.2}}>
                  {(rowData.isSelected && rowData.isSelected == true) &&
                    <Image source={require('../images/ic_keyboard_arrow_up_black.png')}/>
                  }

                  {(!rowData.isSelected || (rowData && rowData.isSelected == false)) &&
                    <Image source={require('../images/ic_keyboard_arrow_down_black.png')}/>
                  }

                </View>
            </View>

            {(rowData.isSelected && rowData.isSelected == true) &&
              <View style={{justifyContent: 'center',padding:16, paddingTop:0, paddingBottom:24}}>
              {!isEmpty(rowData.name) &&
                <Text style={[styles.header, { marginTop:8}]}>{rowData.name}</Text>
              }
              {!isEmpty(rowData.address_line1) &&
                <Text style={[styles.content, { marginTop:8}]}>{rowData.address_line1}</Text>
              }

              {!isEmpty(rowData.address_line2) &&
                <Text style={[styles.content, { marginTop:8}]}>{rowData.address_line2}</Text>
              }

              {!isEmpty(city) &&
                <Text style={[styles.content, { marginTop:8}]}>{city}</Text>
              }

              {!isEmpty(rowData.phone) &&
                <Text style={[styles.content, { marginTop:8}]}>{rowData.phone}</Text>
              }

              {!isEmpty(rowData.cell) &&
                <Text style={[styles.content, { marginTop:8}]}>{rowData.cell}</Text>
              }

              {!isEmpty(rowData.email) &&
                <Text style={[styles.content, { marginTop:8}]}>{rowData.email}</Text>
              }

              </View>
            }

          </View>
        </TouchableWithoutFeedback>

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
    fontSize: 14,
    color: '#de9f0b',
    fontFamily: Fonts.OpenSansSemibold
  },
  cardHeader: {
    fontSize: 16,
    color: '#de9f0b',
    fontFamily: Fonts.OpenSansSemibold
  },
  content: {
    fontSize: 13,
    color: '#000000',
    fontFamily: Fonts.OpenSansRegular
  },
  card: {
    borderWidth: 1.4,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 8, height: 8, },
    shadowOpacity: 0.7,
    shadowRadius: 3,
  },
});
