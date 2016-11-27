const SlackBots = require('slackbots');
const util = require('util');
const EventEmitter = require('events');

function SlackBot (config) {
    EventEmitter.call(this);
    var thiis = this;

    thiis.bot = new SlackBots({
        token: config.token,
        name: config.name
    });

    thiis.type = 'slack';

    thiis.bot.on('start', function() {
    //    thiis.emit('online');
    });

    thiis.sendMessage = function (message) {
        var params = {
            "icon_emoji": message.icon_emoji
        };
        thiis.bot.postMessageToUser(config.login, message.text, params).always(function(data) {

        });
    };

    thiis.bot.on('message', function (message) {
        if (message.username != config.name && message.type == 'message') {
            // thiis.emit('message', message);
        }
    });
}

util.inherits(SlackBot, EventEmitter);

module.exports = SlackBot;
