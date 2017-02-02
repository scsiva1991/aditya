import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  Image
} from 'react-native';

import Fonts from '../fonts/Fonts'

export default class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchText: ''
    }
  }

  static propTypes = {
    ...TextInput.propTypes
  }

  setSearchText(searchText) {
    this.setState({
      searchText
    });
  }

  render(){
    return(
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchText, {flex:1}]}
          underlineColorAndroid='transparent'
          autoFocus={false}
          value={this.state.searchText}
          placeholderTextColor={'#C7C7CD'}
          placeholder={'Search'}
          {...this.props}
          onChangeText={this.setSearchText.bind(this)}
          >
        </TextInput>
      </View>
    );
}

}

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    margin:8,
    height: 47,
    backgroundColor:'white',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2
  },
  searchText: {
    fontSize: 17,
    height: 45,
    borderWidth: 0,
    marginRight: (Platform.OS === 'ios') ? 8 : 8,
    marginLeft: (Platform.OS === 'ios') ? 8 : 8,
    fontFamily: Fonts.OpenSansRegular,
    color: '#000000'
  }
});
