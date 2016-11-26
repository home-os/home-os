const util = require('util');
const EventEmitter = require('events');

function WebBot (websocket) {
    EventEmitter.call(this);
    var WebBot = this;

    this.websocket = websocket;

    this.type = 'websocket';

    this.sendMessage = function (message) {
        this.websocket.emit('stdout', message.text);
    };

    this.websocket.on('stdin', function (stdin) {
        WebBot.emit('message', {
            text: stdin
        });
    })

}

util.inherits(WebBot, EventEmitter);

module.exports = WebBot;
