/*Take get request*/
function doGet(e) {

  if (typeof e !== "undefined") {
    var body=JSON.stringify(e.parameter);
    if (body.callback_query===undefined){
    writeData(JSON.stringify(e.parameter));//для гет запроса заменгить
    }
    
    
  }
}

/*Take post request*/
function doPost(e) {
  if (typeof e !== "undefined"){
       var body=JSON.parse(e.postData.contents);
    if (body.callback_query===undefined){
      Huificator(body);
    }
    else{
      
    CallBack(body);
    }
  }
}
