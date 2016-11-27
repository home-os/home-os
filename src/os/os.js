const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs-extra');
const path = require('path');
const Agenda = require('agenda');
const util = require('util');
const os = require('os');
const dotenv = require('dotenv');
// const Cylon = require('cylon');

dotenv.config({silent: true});

// console.log(os.hostname());
// const Sequelize = require('sequelize');
const packageJson = require('./../../package.json');
const config = packageJson.config;
const version = packageJson.version;
const commands = require('./commands');
const music = require('./modules/music');
const sound = require('./modules/sound');
const wifi = require('./modules/wifi');
const logger = require('./logger');
const Ai = require('./ai');
const SlackBot = require('./modules/communication/slack-bot');
var slackBot = new SlackBot({
    token: process.env.SLACK_API_TOKEN,
    name: process.env.NAME,
    login: process.env.SLACK_LOGIN
});

const WebBot = require('./modules/communication/web-bot');

var folders = {};

['node_modules', 'logs', 'data', 'data/music']
.forEach(function (folder) {
    folders[folder] = path.join(__dirname, '../../'+folder);
});

fs.ensureDirSync(folders.data);

var alarmMusic = path.join(folders['data/music'], 'Lykke\ Li\ -\ I\ Follow\ Rivers\ \(The\ Magician\ Remix\).mp3');

var ai = new Ai(process.env.NAME);

ai.start();

ai.on('say', function (answer) {
    console.log(message);
    if (answer.origin == 'default') {
        slackBot.sendMessage(answer.message);
    } else {
        answer.origin.sendMessage(answer.message);
    }
});

ai.on('run', function (task) {
    agenda.now(task.cmd.id, task.cmd.args);
});

slackBot.on('online', function () {
    ai.setOnline(true);
});

slackBot.on('message', function (message) {
    // console.log(message);
    ai.analyzeMessage(slackBot, message.text);
});

app
.get('/logs', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public/logs.html'));
})
.use(express.static(path.join(__dirname, '../public/')));

io.on('connection', function (socket) {

    socket.on('ask-for-name', function () {
        socket.emit('name', process.env.NAME);
    });

    socket.on('ask-for-version', function () {
        socket.emit('version', version);
    });

    var webBot = new WebBot(socket);

    webBot.on('message', function (message) {
        ai.analyzeMessage(webBot, message.text);
    });

});

var server = http.listen(process.env.PORT || 8080, function () {
    logger.info('listening on http://localhost:'+server.address().port);
});

// agenda

var agenda = new Agenda({db: {address: config.db}});
//
agenda.define('start-music', {priority: 'high', concurrency: 1}, function(job, done) {
    logger.info('start-music');
    music.play(alarmMusic);
    done();
});

agenda.define('stop-music', {priority: 'high', concurrency: 1}, function(job, done) {
    logger.info('stop-music');
    music.stop();
    done();
});

agenda.define('set-volume', {priority: 'high', concurrency: 1}, function(job, done) {
    logger.info('set-volume', job.attrs.data.value);
    sound.setVolume(job.attrs.data.value);
    done();
});

agenda.define('connect-wifi', {priority: 'high', concurrency: 1}, function(job, done) {
    logger.info('connect-wifi', job.attrs.data);
    if (!jobs.attrs.data) {
        wifi.connect(function (err) {
            if (err) {
                logger.info('connect-wifi-failed', err);
            } else {
                logger.info('connect-wifi-success');
            }
        });
    }
    done();
});


//
// agenda.jobs({}, function(err, jobs) {
//     console.log(jobs);
//   // Work with jobs (see below)
// });

agenda.on('ready', function() {
    logger.info('agenda ready');
    // agenda.schedule('in 30 seconds', 'start-music');

    // agenda.schedule('in 1 minute', 'start-alarm-clock');
    // agenda.schedule('today at 11am and 39 minutes', 'wake up');
    agenda.start();
    // agenda.now('connect-wifi');
});
