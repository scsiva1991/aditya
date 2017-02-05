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
  isEmpty, isValidEmail
} from '../util/ValidationUtils';
import {
  showAlert
} from '../util/ReactUtils';

var FloatingLabel = require('../components/FloatingLabel');
import Spinner from '../components/Spinner';
import DetailsService from '../api/service/DetailsService';


export default class FeedbackTabItem extends Component {

  constructor (props) {
    super(props)
    this.state = {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      country: '',
      phone: '',
      email: '',
      feedback: '',
      spinnerVisible: false
    };
  }

  focusNextField = (nextField) => {
    this.refs[nextField].focus();
  }

  componentDidMount(){
    this._isMounted = true;
  }


  componentWillUnmount(){
    this._isMounted = false;
  }

  submitData = () => {
    let _this = this;
    if (isEmpty(this.state.name)){
      showAlert(Constants.message, 'Please enter valid name');
    } else if(isEmpty(this.state.city)){
      showAlert(Constants.message, 'Please enter valid city');
    } else if(isEmpty(this.state.state)){
      showAlert(Constants.message, 'Please enter valid state name');
    }else if(isEmpty(this.state.pincode)|| (!isEmpty(this.state.pincode) && this.state.pincode.length != 6) ){
      showAlert(Constants.message, 'Please enter valid pincode number');
    }else if(isEmpty(this.state.country)){
      showAlert(Constants.message, 'Please enter valid country name');
    }else if(isEmpty(this.state.phone) || (!isEmpty(this.state.phone) && this.state.phone.length != 10) ){
      showAlert(Constants.message, 'Please enter valid phone number');
    }else if(!isEmpty(this.state.email) && !isValidEmail(this.state.email) ){
      showAlert(Constants.message, 'Please enter valid email');
    }else if(isEmpty(this.state.feedback)){
      showAlert(Constants.message, 'Please enter valid feedback');
    }else{
      let feedbackObj = {
       "name": this.state.name,
       "city":this.state.city,
       "state":this.state.state,
       "pincode":this.state.pincode,
       "country":this.state.country,
       "address":this.state.address,
       "phone":this.state.phone,
       "email":this.state.email,
       "feedback":this.state.feedback
     };
     DetailsService.postFeedBack(feedbackObj,() => {
       this.setState({ spinnerVisible: true });
     },(error, response) => {
       if(this._isMounted){
         this.setState({ spinnerVisible: false });
         if(error){
           showAlert(Constants.error, error);
         }else{
           showAlert(Constants.message, "Thank you for your feedback");
           _this.setState({
             "name": '',
             "city": '',
             "address": '',
             "state": '',
             "pincode": '',
             "country": '',
             "address": '',
             "phone":'',
             "email":'',
             "feedback":''
           });
         }
       }
     });
    }

  }


  render(){
    return(
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <ScrollView style={{flex:1, marginRight: 16, marginLeft: 16}}
              showsVerticalScrollIndicator={false} >
          <FloatingLabel
              ref='name'
              onChangeText={ (text) => {
                this.setState({ name: text });
              }}
              autoFocus={false}
              value={this.state.name.toString()}
              labelStyle={styles.floatingLabelInput}
              inputStyle={styles.floatingTextInput}
              style={[styles.floatingFormInput, {marginTop: 24}]}
              autoCorrect={false}
              onSubmitEditing={() => this.focusNextField('address')}
              underlineColorAndroid='transparent'
            >Name</FloatingLabel>

          <FloatingLabel
              ref='address'
              onChangeText={ (text) => {
                this.setState({ address: text });
              }}
              value={this.state.address.toString()}
              autoFocus={false}
              labelStyle={styles.floatingLabelInput}
              inputStyle={styles.floatingTextInput}
              style={[styles.floatingFormInput, {marginTop: 24}]}
              autoCorrect={false}
              onSubmitEditing={() => this.focusNextField('city')}
              underlineColorAndroid='transparent'
            >Address</FloatingLabel>


          <FloatingLabel
                ref='city'
                onChangeText={ (text) => {
                  this.setState({ city: text });
                }}
                autoFocus={false}
                labelStyle={styles.floatingLabelInput}
                inputStyle={styles.floatingTextInput}
                value={this.state.city.toString()}
                style={[styles.floatingFormInput, {marginTop: 24}]}
                autoCorrect={false}
                onSubmitEditing={() => this.focusNextField('state')}
                underlineColorAndroid='transparent'
              >City</FloatingLabel>

          <FloatingLabel
                  ref='state'
                  onChangeText={ (text) => {
                    this.setState({ state: text });
                  }}
                  autoFocus={false}
                  labelStyle={styles.floatingLabelInput}
                  inputStyle={styles.floatingTextInput}
                  value={this.state.state.toString()}
                  style={[styles.floatingFormInput, {marginTop: 24}]}
                  autoCorrect={false}
                  onSubmitEditing={() => this.focusNextField('pincode')}
                  underlineColorAndroid='transparent'
                >State</FloatingLabel>

          <FloatingLabel
                    ref='pincode'
                    onChangeText={ (text) => {
                      this.setState({ pincode: text });
                    }}
                    autoFocus={false}
                    labelStyle={styles.floatingLabelInput}
                    inputStyle={styles.floatingTextInput}
                    style={[styles.floatingFormInput, {marginTop: 24}]}
                    autoCorrect={false}
                    value={this.state.pincode.toString()}
                    maxLength={6}
                    keyboardType="numeric"
                    onSubmitEditing={() => this.focusNextField('country')}
                    underlineColorAndroid='transparent'
                  >Pincode</FloatingLabel>

            <FloatingLabel
                      ref='country'
                      onChangeText={ (text) => {
                        this.setState({ country: text });
                      }}
                      autoFocus={false}
                      labelStyle={styles.floatingLabelInput}
                      inputStyle={styles.floatingTextInput}
                      value={this.state.country.toString()}
                      style={[styles.floatingFormInput, {marginTop: 24}]}
                      autoCorrect={false}
                      onSubmitEditing={() => this.focusNextField('phone')}
                      underlineColorAndroid='transparent'
                    >Country</FloatingLabel>

              <FloatingLabel
                        ref='phone'
                        onChangeText={ (text) => {
                          this.setState({ phone: text });
                        }}
                        autoFocus={false}
                        labelStyle={styles.floatingLabelInput}
                        inputStyle={styles.floatingTextInput}
                        style={[styles.floatingFormInput, {marginTop: 24}]}
                        autoCorrect={false}
                        value={this.state.phone.toString()}
                        maxLength={10}
                        keyboardType="numeric"
                        onSubmitEditing={() => this.focusNextField('email')}
                        underlineColorAndroid='transparent'
                      >Phone</FloatingLabel>

              <FloatingLabel
                          ref='email'
                          onChangeText={ (text) => {
                            this.setState({ email: text });
                          }}
                          autoFocus={false}
                          keyboardType="email-address"
                          labelStyle={styles.floatingLabelInput}
                          inputStyle={styles.floatingTextInput}
                          style={[styles.floatingFormInput, {marginTop: 24}]}
                          autoCorrect={false}
                          value={this.state.email.toString()}
                          onSubmitEditing={() => this.focusNextField('feedback')}
                          underlineColorAndroid='transparent'
                        >Email</FloatingLabel>

            <FloatingLabel
                            ref='feedback'
                            onChangeText={ (text) => {
                              this.setState({ feedback: text });
                            }}
                            multiline={true}
                            autoFocus={false}
                            numberOfLines={3}
                            labelStyle={styles.floatingLabelInput}
                            inputStyle={styles.floatingTextInput}
                            value={this.state.feedback.toString()}
                            style={[styles.floatingFormInput, {marginTop: 24}]}
                            autoCorrect={false}
                            underlineColorAndroid='transparent'
                          >Your Feedback</FloatingLabel>
            <View style={{height: 50}}></View>

        </ScrollView>

        <TouchableHighlight onPress={this.submitData} style={{flexDirection:'row', paddingTop:16, paddingBottom:16, backgroundColor:'#de9f0b', justifyContent:'center'}}>
                <Text style={{textAlign:'center', color:'white', fontFamily: Fonts.OpenSansSemibold, fontSize: 20}}>SUBMIT</Text>
        </TouchableHighlight>

        <Spinner visible={this.state.spinnerVisible} color={'#890889'} closable={false} size={'large'} overlayColor={'rgba(0,0,0,0.58)'} />

      </View>
    );
  }

}

const styles = StyleSheet.create({
  floatingLabelInput: {
    color: 'grey',
    fontFamily:Fonts.OpenSansRegular,
    fontSize:16,
    marginBottom: 3
  },
  floatingFormInput: {
    borderBottomWidth: 1,
    borderColor: '#de9f0b'
  },
  floatingTextInput: {
    borderWidth: 0,
    color: 'black',
    flex:1,
    fontFamily:Fonts.OpenSansRegular,
    fontSize:24,
    fontSize: (Platform.OS === 'ios') ? 18 : 24
  }
});
