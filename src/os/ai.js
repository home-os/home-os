const util = require('util');
const EventEmitter = require('events');
const natural = require('natural');

function Ai (name) {
    EventEmitter.call(this);
    var Ai = this;

    this.name = name;
    this.isOnline = false;
    this.tokenizer = new natural.WordTokenizer();

    this.start = function () {
        this.emit('started');
    };

    this.setOnline = function (online) {
        this.isOnline = online;
        this.say('default', 'Hello! I am now online', ':grinning:');
    };

    this.hasWord = function (words, index, string) {
        return natural.JaroWinklerDistance(words[index], string) > 0.7;
    };

    this.analyzeMessage = function (origin, message) {
        var words = this.tokenizer.tokenize(message);

        if (words.length == 1 && this.hasWord(words, 0, Ai.name)) {
            this.say(origin, 'Yes sire?', ':slightly_smiling_face:');
        } else if (words.length >= 2 && this.hasWord(words, 1, 'music')) {
            if (this.hasWord(words, 0, 'start')) {
                this.run(origin, { id: 'start-music' });
            } else if (this.hasWord(words, 0, 'stop')) {
                this.run(origin, { id: 'stop-music' });
            } else {
                this.say(origin, 'Sorry, I don\'t know what you mean.', ':thinking_face:');
            }
        } else {
            this.say(origin, 'Sorry, I don\'t know what you mean.', ':thinking_face:');
        }
    };

    this.say = function (origin, text, icon_emoji) {
        this.emit('say', { message: { text: text, icon_emoji: icon_emoji }, origin: origin });
    };

    this.run = function (origin, cmd) {
        this.emit('run', { cmd: cmd, origin: origin });
    };
}

util.inherits(Ai, EventEmitter);

module.exports = Ai;
