import Config from '../config'
import StorageUtils from '../../util/StorageUtils';
import {
  isEmpty
} from '../../util/ValidationUtils';

module.exports = {
  getContacts : function (preExecute, postExecute) {
      if(preExecute){
        preExecute();
      }
      try{
        fetch(Config.baseUrl + "?action=get_contacts", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }).then((response) => {
            console.log("------getContacts------"+JSON.stringify(response));
            if(response.status === 200){
              let parsedJsonObj = JSON.parse(response._bodyText);
              if(parsedJsonObj && parsedJsonObj.result){
                StorageUtils.storeJsonValues(StorageUtils.key_contacts, parsedJsonObj.result);
                postExecute(null, parsedJsonObj.result);
              }else{
                  postExecute(Config.errorMessage, null);
              }
            }else{
              postExecute(Config.errorMessage, null);
            }
        }).catch((error) => {
          console.error(error);
          postExecute(Config.errorMessage, null);
        });
      }catch(error) {
        console.error(error);
        postExecute(Config.errorMessage, null);
      }
  },
  getBranches : function (preExecute, postExecute) {
      if(preExecute){
        preExecute();
      }
      try{
        fetch(Config.baseUrl + "?action=get_branches", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }).then((response) => {
            console.log("------getBranches------"+JSON.stringify(response));
            if(response.status === 200){
              let parsedJsonObj = JSON.parse(response._bodyText);
              if(parsedJsonObj && parsedJsonObj.result){
                StorageUtils.storeJsonValues(StorageUtils.key_branches, parsedJsonObj.result);
                postExecute(null, parsedJsonObj.result);
              }else{
                  postExecute(Config.errorMessage, null);
              }
            }else{
              postExecute(Config.errorMessage, null);
            }
        }).catch((error) => {
          console.error(error);
          postExecute(Config.errorMessage, null);
        });
      }catch(error) {
        console.error(error);
        postExecute(Config.errorMessage, null);
      }
  },
}
