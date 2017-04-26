var botId = "<your-bot-id>"; //telegram bot id
var yandexAccessKey = "<your-yandex-access-key>";//yandex speech access key
/*some variables for text transform logic*/
var sogl = "бвгджзклмнпрстфхцчшщ";
var gl = "аеёиоуэюыя";
var equenc = {
  "а": "я",
  "е": "е",
  "ё": "ё",
  "и": "и",
  "о": "е",
  "у": "ю",
  "э": "е",
  "ю": "ю",
  "я": "я",
  "ы": "и"
};

/*Take get request*/
/*Could be removed*/
function doGet(e) {

  if (typeof e !== "undefined") {
    writeData(JSON.stringify(e.parameter));//для гет запроса заменгить
  }
}

/*Take post request*/
function doPost(e) {
  if (typeof e !== "undefined")
    Huificator(JSON.parse(e.postData.contents));
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

/*Main method*/
function Huificator(update) {
  offset = update.update_id + 1;
  var text = update.message.text;

  //transform text
  text = getHuefiText(text);

  //send message to telegram chat
  sendMessage(update.message.chat.id, text);

  //send audio to telegram chat
  sendAudio(update.message.chat.id, yandexSinthes(text));

  writeLog({
    date: new Date(update.message.date * 1000),
    inMessage: update.message.text,
    outMessage: text,
    userName: update.message.from.first_name + " " + update.message.from.last_name,
    userId: update.message.from.id,
    userUsername: update.message.from.username
  });

}


/*SendMessageToTelegramChat*/
function sendMessage(chatid, message) {
  UrlFetchApp.fetch("https://api.telegram.org/bot" + botId + "/sendMessage", {
    "method": "post",
    "payload": {
      chat_id: chatid,
      text: message
    }
  });
}

/*SendAudioToTelegramChat*/
/*UrlFetchApp can't correctly form post request with multipart/form-data content type, so we need to make body of request by yourself*/
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


/*YANDEX SpeechSinthes*/
function yandexSinthes(text) {
  var params = "text=" + text + "&" +
    "format=opus" + "&" +
    "quality=hi" + "&" +
    "lang=ru-RU" + "&" +
    "speaker=zahar" + "&" +
    "speed=0.6" + "&" +
    "emotion=evil" + "&" +
    "key=" + yandexAccessKey;
  var options = {
    "method": "get",
    "muteHttpExceptions": true,
  };
  var audio = UrlFetchApp.fetch("https://tts.voicetech.yandex.net/generate?" + params, options);
  return audio;
}

/*TRANSFORM TEXT*/
function getHuefiText(message) {
  var text = message;
  text = text.replace(/(\r\n|\n|\r)/gm, " ");
  if (text.length >= 4096) {
    text = "Ваше сообщение слишком большое, попробуйте отправить его по частям";
  } else {
    if (text == "/start") {
      text = "Просто вставьте текст, который необходимо хуифицировать. Через секунду вы получите обработанный текст.";
    } else {
      text = text.trim();
      text = text.toLowerCase();
      var arrayOfWords = text.split(" ");
      text = "";
      var wordoriginal = "";
      arrayOfWords.forEach(function (word) {
        wordoriginal = "";
        if (word.length > 3) {
          wordoriginal = word + "-";
          while (~sogl.indexOf(word[0])) {
            word = word.substr(1);
          }
          word = "ху" + equenc[word[0]] + word.substr(1);
        }
        text = text + " " + wordoriginal + word;
      });
    }


  }
  return text;
}



/*LOG MESSAGE DATA */
function writeLog(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0]; /*sheet number*/

  var lastRow = sheet.getLastRow() + 1;

  sheet.setActiveSelection("A" + lastRow).setNumberFormat("@STRING@").setValue(data.date);
  sheet.setActiveSelection("B" + lastRow).setNumberFormat("@STRING@").setValue(data.userUsername);
  sheet.setActiveSelection("C" + lastRow).setNumberFormat("@STRING@").setValue(data.userId);
  sheet.setActiveSelection("D" + lastRow).setNumberFormat("@STRING@").setValue(data.userName);
  sheet.setActiveSelection("E" + lastRow).setNumberFormat("@STRING@").setValue(data.inMessage);
  sheet.setActiveSelection("F" + lastRow).setNumberFormat("@STRING@").setValue(data.outMessage);

}

/*LOG ANY DATA */
function writeData(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[1];

  var lastRow = sheet.getLastRow() + 1;

  sheet.setActiveSelection("A" + lastRow).setNumberFormat("@STRING@").setValue(data);
}