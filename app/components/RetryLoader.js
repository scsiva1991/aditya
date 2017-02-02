import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Constants from '../Constants';
import Fonts from '../fonts/Fonts';
import Colors from '../colors/Colors'

const SIZES = ['small', 'normal', 'large'];

export default class RetryLoader extends React.Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    retryOptionVisible: React.PropTypes.bool,
    loaderColor: React.PropTypes.string,
    loaderSize: React.PropTypes.oneOf(SIZES),
    loadingContentBackgroundColor: React.PropTypes.string,
    errorMessage: React.PropTypes.string,
    retryButtonText: React.PropTypes.string,
    onRetry: React.PropTypes.func,
    retryButtonBackgroundColor: React.PropTypes.string,
  };

  static defaultProps = {
    retryOptionVisible: false,
    loaderColor: Colors.loaderColor,
    loaderSize: 'large',
    loadingContentBackgroundColor: 'white',
    errorMessage: Constants.error_message,
    retryButtonText: Constants.retry,
    retryButtonBackgroundColor: '#696969',
  };

  render() {
    return(
      <View style={styles.container} >
        <View style={[styles.background,{ backgroundColor: this.props.loadingContentBackgroundColor }]}>

          {!this.props.retryOptionVisible &&
            <ActivityIndicator
              color={this.props.loaderColor}
              size={this.props.loaderSize}
              style={{ flex: 1 }}
              />
          }

          {this.props.retryOptionVisible &&
            <View style={{ flex: 1, justifyContent:'center' }}>
              <Text style={styles.errorMessageText}>{this.props.errorMessage}</Text>
              <View style={styles.retryButtonOuterContainer}>
                <TouchableOpacity
                  onPress={() => {if(this.props.onRetry){this.props.onRetry();}}}
                  >
                  <View style={[styles.retryButton,{backgroundColor: this.props.retryButtonBackgroundColor}]}>
                    <Text style={styles.retryButtonText}>{this.props.retryButtonText}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          }
        </View>
      </View>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorMessageText: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
    fontFamily: Fonts.OpenSansRegular
  },
  retryButtonOuterContainer: {
    marginTop: 20,
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  retryButton: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  retryButtonText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: Fonts.OpenSansSemibold
  }
});
