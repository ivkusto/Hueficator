/*SendMessageToTelegramChat*/
function sendMessage(chatid, message) {
  UrlFetchApp.fetch("https://api.telegram.org/bot" + botId + "/sendMessage", {
    "method": "post",
    "payload": {
      chat_id: chatid,
      text: message
    },
   "muteHttpExceptions": true
  });
}


/*SendAudioToTelegramChat*/
function sendAudio(chatid, audiofile) {
  var boundary = "labnol";
  var blob = audiofile.getBlob();

  var attributes = "{\"chat_id\":\"" + chatid + "\"}}";

  var requestBody = Utilities.newBlob(
    "--" + boundary + "\r\n"
    + "Content-Disposition: form-data; name=\"chat_id\"\r\n\r\n"
    + chatid + "\r\n" + "--" + boundary + "\r\n"
    + "Content-Disposition: form-data; name=\"voice\"; filename=\"" + blob.getName() + "\"\r\n"
    + "Content-Type: " + blob.getContentType() + "\r\n\r\n").getBytes()
    .concat(blob.getBytes())
    .concat(Utilities.newBlob("\r\n--" + boundary + "--\r\n").getBytes());

  var options = {
    method: "post",
    contentType: "multipart/form-data; boundary=" + boundary,
    muteHttpExceptions: true,
    payload: requestBody,
  };

  var request = UrlFetchApp.fetch("https://api.telegram.org/bot" + botId + "/sendVoice", options);

}
/*Users Photo*/
function getUserPhoto(chatid) {
 var PhotoArray= UrlFetchApp.fetch("https://api.telegram.org/bot" + botId + "/getUserProfilePhotos", {
    "method": "post",
    "payload": {
      user_id: chatid,
    },
    "muteHttpExceptions": true
  });

  var r=JSON.parse(PhotoArray);
  if (!r.ok) {return "empty";}
  if (r.result.total_count===0) {return "empty";}
  var PhotoPath= UrlFetchApp.fetch("https://api.telegram.org/bot" + botId + "/getFile", {
    "method": "post",
    "payload": {
      file_id: r.result.photos[0][2].file_id,
    }
  });
  return JSON.parse(PhotoPath).result.file_path;
}

function removeKeyboard(chatid) {
  var ReplyKeyboardRemove={remove_keyboard:true};
 ReplyKeyboardRemove= JSON.stringify(ReplyKeyboardRemove);
  UrlFetchApp.fetch("https://api.telegram.org/bot" + botId + "/sendMessage", {
    "method": "post",
    "payload": {
      chat_id: chatid,
      text: "remove",
      reply_markup: ReplyKeyboardRemove            
    },
  // "muteHttpExceptions": true
  });
}

function sendMessageWithKeyBoard(chatid, message,keyboard) {
  UrlFetchApp.fetch("https://api.telegram.org/bot" + botId + "/sendMessage", {
    "method": "post",
    "payload": {
      chat_id: chatid,
      text: message,
      reply_markup:keyboard             
    },
   "muteHttpExceptions": true
  });
}

function answerCallbackQuery(callback_query,message){
UrlFetchApp.fetch("https://api.telegram.org/bot" + botId + "/answerCallbackQuery", {
    "method": "post",
    "payload": {
      callback_query_id: callback_query.id,
      text: message,
      show_alert:true
    },
   "muteHttpExceptions": true
  });
}




/*Set webhook to telegram*/
function setWebHook() {
  var formData = {
    "url": ScriptApp.getService().getUrl()
  };
  var options = {
    "method": "post",
    "payload": formData
  };
  var setwebhook = UrlFetchApp.fetch("https://api.telegram.org/bot" + botId + "/setWebhook", options);
}