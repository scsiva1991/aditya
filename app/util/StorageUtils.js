import { AsyncStorage } from 'react-native';
import Constants from '../Constants'

module.exports = {

  key_vision : Constants.appName + '_' + 'vision',
  key_contacts : Constants.appName + '_' + 'contacts',
  key_branches : Constants.appName + '_' + 'branches',  

  storeJsonValues: async function storeJsonValues(key, jsonObject) {
    try{
      this.storeStringValues(key, JSON.stringify(jsonObject));
    }catch(error){
      console.log('Error storing JsonValues ---' + error);
    }
  },

  storeStringValues: async function  storeStringValues(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('Error storing StringValues ---'+error);
    }
  },

  getStringValues: async function getStringValues(key, callback) {
    try {
      await AsyncStorage.getItem(key, (error,result) => {
        if (result !== null){
          console.log('getStringValues key & value ---' + key + ' & ' + result);
        }
        if(callback){
          callback(result);
        }
      });

    } catch (error) {
      console.log('Error retrieving data ---',error);
    }
  },

  getJsonObject: async function getJsonObject(key, callback) {
    try {
      await AsyncStorage.getItem(key, (error,result) => {
        if (result !== null){
          console.log('getJsonObject key & value ---' + key + ' & ' + result);
          result = JSON.parse(result);
        }
        if(callback){
        callback(result);
        }
      });

    } catch (error) {
      console.log('Error retrieving data ---',error);
    }
  },

  clearValues: async function  clearValues() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log('Error while clear the values ---'+error);
    }
  }

}
