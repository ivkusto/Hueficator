# Hueficator
Telegram Bot on Google Script, that add russian slanguage word "хуй" to any sending phrase (F.e. "озеро-хуезеро". It's not for rudeness, just for joke.)
Text-transform logic it's not really interesting. What is actually matter - how simply make telegram Bot, for recieve/answer messages, synthes voice, even if you haven't got your own server.

You can see how bot works here http://t.me/HueficatorBot

Technologies: Google Script App, Telegram Bot Api, Yandex Speechkit, multipart/form-data, webhook

To use it you need:
1. Make your own bot and get bot-id; https://core.telegram.org/bots , https://telegram.me/botfather
2. Create new Google Sheets document https://docs.google.com/spreadsheets/. Open Tools->Script Editor and paste Code.gs file from repository
3. Change botID variable value to your botid;
4. In Top menu  choose Publish->Deploy As web app. In field "Who has access to the app" choose "Anyone, even anonymous". Click Publish. (more about web app https://developers.google.com/apps-script/guides/web#deploying_a_script_as_a_web_app)
5. Choose and run function "Setwebhook" in field "Select Function" (toolbar on top)
6. If you don't need speech synthes, just comment calling of "sendAudio", otherwise go to Yandex Speechkit and get your access key;
https://tech.yandex.ru/speechkit/cloud/doc/guide/concepts/tts-http-request-docpage/
https://tech.yandex.com/speechkit/cloud/doc/guide/concepts/tts-http-request-docpage/

Actually it's looks like Yandex don't like foreign languages and give access key on *.com domain only by email request, but in *.ru domain you just need to have email in Yandex))

About Google App Script: https://developers.google.com/apps-script/

