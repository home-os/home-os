// const SlackBot = require('./../src/os/modules/slack-bot');
const Ai = require('./../src/os/ai');
const media = require('./../src/os/modules/communication/media');

require('dotenv').config();

const name = process.env.NAME;

var ai = new Ai(name);
ai.start();

var medium = media.get(name, 'slack');

medium.on('online', function () {
    ai.setOnline(true);
});

medium.on('message', function (message) {
    console.log(message);
    ai.analyzeMessage('slack', message.text);
});

ai.on('said', function (answer) {
    console.log(message);
    medium.sendMessage(answer.message);
});
