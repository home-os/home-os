const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs-extra');
const path = require('path');
const winston = require('winston');
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

var folders = {};

['node_modules', 'logs', 'data', 'data/music']
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

var alarmMusic = path.join(folders['data/music'], 'Lykke\ Li\ -\ I\ Follow\ Rivers\ \(The\ Magician\ Remix\).mp3');

var server = http.listen(process.env.PORT || 8080, function () {
    logger.info('listening on http://localhost:'+server.address().port);
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

        var command = commands.process(stdin);

        if (command.id == 'stop-music') {
            agenda.now('stop-music');
        } else if (command.id == 'start-music') {
            agenda.now('start-music');
        } else if (command.id == 'set-volume') {
            agenda.now('set-volume', command.args);
        }

        socket.emit('stdout', command.stdout);

    });
});

var agenda = new Agenda({db: {address: config.db}});
/*
var button

Cylon.robot({
  connections: {
    arduino: { adaptor: 'firmata', port: '/dev/ttyACM0' }
  },

  devices: {
    led: { driver: 'led', pin: 13 },
    button: { driver: 'button', pin: 2 }
  },

  work: function(my) {
    my.button.on('push', function() {
        agenda.now('stop-music');
      //my.led.toggle()
    });
  }
}).start();
*/

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
    agenda.now('connect-wifi');
});
