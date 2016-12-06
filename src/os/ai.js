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

    this.hasWords = function (words, string) {
        var wordList = string.split(' ');
        if (words.length < wordList.length) {
            return false;
        }

        for(var i = 0 ; i < wordList.length ; i++) {
            if (!this.hasWord(words, i, wordList[i])) {
                return false;
            }
        }
        return true;
    };

    this.do = function (task) {
        if (task.id == 'reminder') {
            ai.say('default', 'Do no forget to ' + task.cmd.todo + ' (' + task.time + ')');
        }
    };

    this.analyzeMessage = function (origin, message) {
        var words = this.tokenizer.tokenize(message);

        if (this.hasWords(words, Ai.name)) {
            this.say(origin, 'Yes sire?', ':slightly_smiling_face:');
        } else if (this.hasWords(words, 'start music')) {
            this.run(origin, { id: 'start-music' });
        } else if (this.hasWords(words, 'stop music')) {
            this.run(origin, { id: 'stop-music' });
        } else if (this.hasWords(words, 'wake me up')) {
            words.splice(0, 3);
            this.say(origin, 'I will wake you up ' + words.join(' '));
            this.run(origin, { id:'wake-up', time: words.join(' ') });
        } else if (this.hasWords(words, 'reminds me')) {
            var indexOfTo = words.indexOf('to');
            if (indexOfTo > 0) {
                words.splice(0, 2);
                var schedule = words.splice(0, indexOfTo-1);
                words.splice(0, 1);
                this.say(origin, 'Ok I will do that');
                console.log( words.join(' '), schedule.join(' '));

                //this.run(origin, { id:'reminder', args: {  todo: words.join(' ') } }, schedule.join(' '));
            } else {
                this.say(origin, 'Sorry but I think your request is incorrect. The proper way is "reminds me <when> to <what>."', ':thinking_face:');
            }
        } else {
            this.say(origin, 'Sorry, I don\'t know what you mean.', ':thinking_face:');
        }
    };

    this.say = function (origin, text, icon_emoji) {
        if (!icon_emoji) {
            icon_emoji = ':grinning:';
        }
        this.emit('say', { message: { text: text, icon_emoji: icon_emoji }, origin: origin });
    };

    this.run = function (origin, cmd, time) {
        var task = { cmd: cmd, origin: origin };
        if (time) {
            task.time = time;
        }
        this.emit('run', task);
    };
}

util.inherits(Ai, EventEmitter);

module.exports = Ai;
