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
  getVisionAndMission : function (preExecute, postExecute) {
      if(preExecute){
        preExecute();
      }
      try{
        fetch(Config.baseUrl + "?action=get_vision_mission", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }).then((response) => {
            console.log("------getVisionAndMission------"+JSON.stringify(response));
            if(response.status === 200){
              let parsedJsonObj = JSON.parse(response._bodyText);
              if(parsedJsonObj && parsedJsonObj.result){
                StorageUtils.storeJsonValues(StorageUtils.key_vision, parsedJsonObj.result);
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
  postFeedBack : function (feedbackObj, preExecute, postExecute) {
        /*{
         "name":"Anand",
         "city":"Chennai",
         "state":"Tamil nadu",
         "pincode":"607 402",
         "country":"India",
         "address":"New st",
         "phone":"9790555814",
         "email":"anand@connectivelinkstechnology.com",
         "feedback":"Testing..."
       }*/
      if(preExecute){
        preExecute();
      }
      try{
        fetch(Config.baseUrl + "?action=post_feedback", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(feedbackObj),
        }).then((response) => {
            console.log("------postFeedBack------"+JSON.stringify(response));
            if(response.status === 200){
              let parsedJsonObj = JSON.parse(response._bodyText);
              if(parsedJsonObj && parsedJsonObj.result){
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
