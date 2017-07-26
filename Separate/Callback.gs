function CallBack(body) {
    
   
      answerCallbackQuery(body.callback_query,"От души! Ваш голос принят!");
   
      oprosLog({id:body.callback_query.from.id,data:body.callback_query.data});
   
}
