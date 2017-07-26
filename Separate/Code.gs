/*Main method*/
function Huificator(update) {
  offset = update.update_id + 1;
  var text = update.message.text;

  //transform text
  text = getHuefiText(text);

  //send message to telegram chat
  sendMessage(update.message.chat.id, text);
  if ((update.message.text!=="/help")&& (update.message.text!=="/start")){
  //send audio to telegram chat
  sendAudio(update.message.chat.id, yandexSinthes(text));
  }

  writeLog({
    date: new Date(update.message.date * 1000),
    inMessage: update.message.text,
    outMessage: text,
    userName: update.message.from.first_name + " " + update.message.from.last_name,
    userId: update.message.from.id,
    userUsername: update.message.from.username
  });

}




function getHuefiText(message) {
  var text = message;
  text = text.replace(/(\r\n|\n|\r)/gm, " ");
  if (text.length >= 4096) {
    text = "Ваше сообщение слишком большое, попробуйте отправить его по частям";
  } else {
    if (text == "/start") {
      text = "Просто напишите текст, который необходимо хуифицировать. Через секунду вы получите обработанный текст. Бот не хуефицирует латиницу";
    }
    else if(text == "/help")
    {
      text = "Просто напишите текст, который необходимо хуифицировать. Через секунду вы получите обработанный текст. Бот не хуефицирует латиницу. По всем вопросам и предложениям писать сюда https://vk.com/zhakovnikita"+
        " и сюда zhakovnikita@gmail.com. При желании можно накинуть на пивко здесь https://money.yandex.ru/to/41001782112076 )) ";
    }
     else {
      text = text.trim();
      text = text.toLowerCase();
      var arrayOfWords = text.split(" ");
      text = "";
      var wordoriginal = "";
      arrayOfWords.forEach(function (word) {
        wordoriginal = "";
        if (word.length > 2) {
          wordoriginal = word + "-";
          while (~sogl.indexOf(word[0])) {
            word = word.substr(1);
          }
          if (equenc[word[0]]===undefined) {word="й";}
          word = "ху" + equenc[word[0]] + word.substr(1);
        }
        text = text + " " + wordoriginal + word;
      });
    }


  }
  return text;
}




