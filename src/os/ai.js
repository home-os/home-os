const util = require('util');
const EventEmitter = require('events');
const natural = require('natural');

function Ai(name) {
    EventEmitter.call(this);
    var Ai = this;

    this.name = name;
    this.isOnline = false;
    this.tokenizer = new natural.WordTokenizer();


    this.start = function () {
        Ai.emit('started');
    };

    this.setOnline = function (online) {
        this.isOnline = online;
        Ai.say('default', 'Hello! I am now online', ':grinning:');
    };

    this.analyzeMessage = function (origin, message) {
        var words = Ai.tokenizer.tokenize(message);

        if (words.length == 1 && natural.JaroWinklerDistance(words[0], Ai.name) > 0.7) {
            Ai.say(origin, 'Yes sire?', ':slightly_smiling_face:');
        }
    };

    this.say = function (origin, text, icon_emoji) {
        Ai.emit('said', { message: { text: text, icon_emoji: icon_emoji }, origin: origin });
    };

    this.run = function (origin, cmd) {
        Ai.emit('run', { cmd: cmd, origin: origin });
    };
}

util.inherits(Ai, EventEmitter);

module.exports = Ai;
