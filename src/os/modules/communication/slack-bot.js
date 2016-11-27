// const SlackBots = require('slackbots');
const util = require('util');
const EventEmitter = require('events');

function SlackBot (config) {
    EventEmitter.call(this);
    var SlackBot = this;

/*
    this.bot = new SlackBots({
        token: config.token,
        name: config.name
    });*/

    this.type = 'slack';

/*
    this.bot.on('start', function() {
        SlackBot.emit('online');
    });
*/
    this.sendMessage = function (message) {
        /*var params = {
            "icon_emoji": message.icon_emoji
        };
        SlackBot.bot.postMessageToUser(config.login, message.text, params).always(function(data) {

        });*/
    };

    /*
    this.bot.on('message', function (message) {
        if (message.username != config.name && message.type == 'message') {
            //SlackBot.emit('message', message);
        }
    });
    */
}

util.inherits(SlackBot, EventEmitter);

module.exports = SlackBot;
