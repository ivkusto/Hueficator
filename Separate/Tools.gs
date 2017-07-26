function sendMessageToAll() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[2];
 var keyboard={
    "inline_keyboard": [ [ {"text":"Через знакомых","callback_data":"friend"}, {"text":"Нашел в поиске","callback_data":"search"} ], [ {"text":"В каталоге телеграм ботов","callback_data":"catalog"},  {"text":"Другое","callback_data":"other"} ] ],
  }
  keyboard=JSON.stringify(keyboard);
  var lastRow = sheet.getLastRow()+1;
  for (var n=1;n<lastRow;n++ ){
 
    var chatid=""+  ss.getRange("A"+n).getValue();
    // sendMessage(chatid,"Если Хуефикатор вам по душе, можете поставить ему оценку вот тут: https://telegram.me/storebot?start=hueficatorbot.");
   
 
    sendMessageWithKeyBoard(chatid,"Как вы узнали о хуефикаторе?",keyboard);
    ss.getRange("C"+n).setValue("yes");
   Utilities.sleep(50);
  }
 
}
function getAllUserPhoto() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[2];

  var lastRow = sheet.getLastRow()+1;
  for (var n=1;n<lastRow;n++ ){
 
    var chatid=""+  ss.getRange("A"+n).getValue();
     ss.getRange("B"+n).setValue('=image("https://api.telegram.org/file/bot'+botId+'/'+getUserPhoto(chatid)+'")');
   Utilities.sleep(200);
  }
 
}
