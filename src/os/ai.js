const util = require('util');
const EventEmitter = require('events');
const natural = require('natural');

function Ai (name) {
    // EventEmitter.call(this);
    // var Ai = this;

    this.name = name;
    this.isOnline = false;
    //this.tokenizer = new natural.WordTokenizer();

    /*

    this.start = function () {
        this.emit('started');
    };

    this.setOnline = function (online) {
        this.isOnline = online;
        this.say('default', 'Hello! I am now online', ':grinning:');
    };

    this.analyzeMessage = function (origin, message) {
        var words = this.tokenizer.tokenize(message);

        if (words.length == 1 && natural.JaroWinklerDistance(words[0], Ai.name) > 0.7) {
            this.say(origin, 'Yes sire?', ':slightly_smiling_face:');
        } else if (words.join(' ') == 'start music') {
            this.run(origin, { id: 'start-music' });
        } else if (words.join(' ') == 'stop-music') {
            this.run(origin, { id: 'stop-music' });
        }
    };

    this.say = function (origin, text, icon_emoji) {
        this.emit('say', { message: { text: text, icon_emoji: icon_emoji }, origin: origin });
    };

    this.run = function (origin, cmd) {
        this.emit('run', { cmd: cmd, origin: origin });
    };*/
}

// util.inherits(Ai, EventEmitter);

module.exports = Ai;
