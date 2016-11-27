const SlackBots = require('slackbots');
const util = require('util');
const EventEmitter = require('events');

function SlackBoty (config) {

    EventEmitter.call(this);
    var SlackBoty = this;

    SlackBoty.bot = new SlackBots({
        token: config.token,
        name: config.name
    });

    SlackBoty.type = 'slack';

    SlackBoty.started = function () {
        SlackBoty.emit('online');
    };

    SlackBoty.bot.on('start', function() {
        SlackBoty.started();
    });

    SlackBoty.sendMessage = function (message) {
        var params = {
            "icon_emoji": message.icon_emoji
        };
        SlackBoty.bot.postMessageToUser(config.login, message.text, params).always(function(data) {

        });
    };

    SlackBoty.bot.on('message', function (message) {
        if (message.username != config.name && message.type == 'message') {
            // thiis.emit('message', message);
        }
    });
}

util.inherits(SlackBoty, EventEmitter);

module.exports = SlackBoty;
