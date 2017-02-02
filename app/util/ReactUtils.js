import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';

export function showAlert(title, message) {
  Alert.alert(title, message, [{text: 'OK', onPress: () => console.log('OK Pressed!')},]);
}

export function showAlertWithCallback(title, message, okPressCallBack) {
  Alert.alert(title, message, [{text: 'OK', onPress: okPressCallBack},], { cancelable: false });
}

export function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

export function goToHome(numberOfBackScreenStacks) {
    for(let count = 0; count < numberOfBackScreenStacks; count++){
          setTimeout(()=>{Actions.pop()}, 10);
    }
}
