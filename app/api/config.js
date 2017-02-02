module.exports = {
  baseUrl : "http://connectivelinkstechnology.com/demo/adithya_school_app/api.php",  
  errorMessage: "Please check your connection and try again",
  generateFormBody: function(requestObj){
    let formBody = [];
    for (var property in requestObj) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(requestObj[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return formBody;
  },
}
