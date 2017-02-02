import Config from '../config'
import StorageUtils from '../../util/StorageUtils';
import RegisterService from './RegisterService';
import {
  isEmpty
} from '../../util/ValidationUtils';
import PolylineKIT from '@mapbox/polyline';

module.exports = {
  getAppointments : function (preExecute, postExecute) {
      if(preExecute){
        preExecute();
      }

      StorageUtils.getJsonObject(StorageUtils.key_login, (result) => {
        if(result !== undefined && result !== null && !isEmpty(result.mobile)){
          try{
            fetch(Config.baseUrl + "/api/appointment", {
              method: 'GET',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': result.token
              }
            }).then((response) => {
                console.log("------getAppointments------"+JSON.stringify(response));
                if(response.status === 200){
                  postExecute(null, JSON.parse(response._bodyText));
                }else if(response.status === 401){
                  RegisterService.authorize(result.mobile,() => {
                  },(error, success) => {
                      if(error){
                        postExecute(Config.errorMessage, null);
                      }else{
                        this.getAppointments(preExecute, postExecute);
                      }
                  })
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
        }
      });
  },
  makeAppointment : function (appointmentObj, suid, preExecute, postExecute) {
      /*
        appointmentObj
        {
          suid:	[alphanumeric],
          date:	[YYYY-MM-dd],
          slot:	[HH:mm]
        }
      */
      if(preExecute){
        preExecute();
      }

      StorageUtils.getJsonObject(StorageUtils.key_login, (result) => {
        if(result !== undefined && result !== null && !isEmpty(result.mobile)){
          try{
            fetch(Config.baseUrl + "/api/" + suid + "/appointment", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': result.token
              },
              body: Config.generateFormBody(appointmentObj)
            }).then((response) => {
                console.log("------makeAppointment------"+JSON.stringify(response));
                if(response.status === 201){
                  postExecute(null, JSON.parse(response._bodyText));
                }else if(response.status === 401){
                  RegisterService.authorize(result.mobile,() => {
                  },(error, success) => {
                      if(error){
                        postExecute(Config.errorMessage, null);
                      }else{
                        this.makeAppointment(appointmentObj, suid, preExecute, postExecute);
                      }
                  })
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
        }
      });
  },
  submitFeedback : function (feedbackObj, preExecute, postExecute) {
      /*
        feedbackObj
        {
          "ref":	"123456",
          "feedback":	"Excellent"
        }
      */
      if(preExecute){
        preExecute();
      }

      StorageUtils.getJsonObject(StorageUtils.key_login, (result) => {
        if(result !== undefined && result !== null && !isEmpty(result.mobile)){
          try{
            console.log("feedbackObj>>>>>>>>>"+feedbackObj);
            fetch(Config.baseUrl + "/api/cfs", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': result.token
              },
              body: Config.generateFormBody(feedbackObj)
            }).then((response) => {
                console.log("------submitFeedback------"+JSON.stringify(response));
                if(response.status === 201){
                  postExecute(null, JSON.parse(response._bodyText));
                }else if(response.status === 401){
                  RegisterService.authorize(result.mobile,() => {
                  },(error, success) => {
                      if(error){
                        postExecute(Config.errorMessage, null);
                      }else{
                        this.submitFeedback(feedbackObj, preExecute, postExecute);
                      }
                  })
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
        }
      });
  },
  getAppointmentsForFeedback : function (preExecute, postExecute) {
      if(preExecute){
        preExecute();
      }
      StorageUtils.getJsonObject(StorageUtils.key_login, (result) => {
        if(result !== undefined && result !== null && !isEmpty(result.mobile)){
          try{
            fetch(Config.baseUrl + "/api/cfs", {
              method: 'GET',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': result.token
              },
            }).then((response) => {
                console.log("------getAppointmentsForFeedback------"+JSON.stringify(response));
                if(response.status === 200){
                  postExecute(null, JSON.parse(response._bodyText));
                }else if(response.status === 401){
                  RegisterService.authorize(result.mobile,() => {
                  },(error, success) => {
                      if(error){
                        postExecute(Config.errorMessage, null);
                      }else{
                        this.getAppointmentsForFeedback(preExecute, postExecute);
                      }
                  })
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
        }
      });
  },
  getDirections : function (directionObj, preExecute, postExecute) {
    /*
      directionObj
      {
        "originLattitude":	"11.22",
        "originLongitude":	"11.87",
        "destinationLattitude":	"11.42",
        "destinationLongitude":	"11.97"
      }
    */
    if(preExecute){
      preExecute();
    }

    try{
      let Url = Config.mapDirectionURL + "&origin=" + directionObj.originLattitude + "," + directionObj.originLongitude +
                    "&destination=" + directionObj.destinationLattitude + "," + directionObj.destinationLongitude;
      fetch(Url, {
        method: 'GET',
      }).then((response) => {
          console.log("------getDirections------"+JSON.stringify(response));
          if(response.status == 200){
            let directionResponse =  JSON.parse(response._bodyText);
            if(directionResponse.status == "OK" && directionResponse.routes
                && directionResponse.routes.length>0){
                let overviewPolyline = directionResponse.routes[0].overview_polyline;
                let points = overviewPolyline.points;
                let polylines = this.generatePolyLines(points);
                postExecute(null, polylines);
            }else{
              postExecute("No services available.", null);
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
  generatePolyLines: function(points){
    let pointsArray = PolylineKIT.decode(points);
    let polyline = [];
    let pointsArrayLength = pointsArray.length;
    for(let count =0; count<pointsArrayLength; count++ ){
      let polylineObj = {};
      polylineObj.latitude = parseFloat(pointsArray[count][0]);
      polylineObj.longitude = parseFloat(pointsArray[count][1]);
      polyline.push(polylineObj);
    }
    return polyline;
  },
}
