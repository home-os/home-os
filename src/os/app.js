const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const fs = require('fs-extra');
const path = require('path');
const winston = require('winston');
const Agenda = require('agenda');
const util = require('util');
const os = require('os');


console.log(os.hostname());

// const play = require('./module/music');

// const Sequelize = require('sequelize');
const packageJson = require('./../../package.json');
const config = packageJson.config;
const version = packageJson.version;
const commands = require('./commands');

var folders = {};

['node_modules', 'logs', 'data', 'music']
.forEach(function (folder) {
    folders[folder] = path.join(__dirname, '../../'+folder);
});

fs.ensureDirSync(folders.data);
fs.ensureDirSync(folders.logs);

var WebSocketLogger = winston.transports.CustomLogger = function (options) {
    this.name = 'websocketLogger';
    this.level = options.level || 'info';
};

util.inherits(WebSocketLogger, winston.Transport);

WebSocketLogger.prototype.log = function (level, msg, meta, callback) {
    io.sockets.emit('logs', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') +': '+msg);
    // console.log(msg);
};

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: path.join(folders.logs, 'logs.txt') }),
        new (WebSocketLogger)({level: 'info'})
    ]
});

var alarmMusic = path.join(folders.music, '01.Moi... Lolita.mp3');

server.listen(8080, function () {
    logger.info('listening on http://localhost:8080');
});

app
.get('/logs', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public/logs.html'));
})
.use(express.static(path.join(__dirname, '../public/')));

io.on('connection', function (socket) {

    socket.on('ask-for-name', function () {
        socket.emit('name', os.hostname());
    });

    socket.on('ask-for-version', function () {
        socket.emit('version', version);
    });

    socket.on('stdin', function (stdin) {
        logger.info('stdin', stdin);
        socket.emit('stdout', commands.process(stdin));
    });
});

var agenda = new Agenda({db: {address: config.db}});

//
agenda.define('wake up', {priority: 'high', concurrency: 1}, function(job, done) {
    logger.info('wake up');
    // play.play(alarmMusic);
    // play.sound(alarmMusic);
});

//
// agenda.jobs({}, function(err, jobs) {
//     console.log(jobs);
//   // Work with jobs (see below)
// });



agenda.on('ready', function() {
    logger.info('agenda ready');
    agenda.schedule('in 1 minute', 'wake up');
    // agenda.schedule('today at 11am and 39 minutes', 'wake up');
    agenda.start();
});