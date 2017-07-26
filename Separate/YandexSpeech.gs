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