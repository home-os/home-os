const winston = require('winston');
const fs = require('fs-extra');
const path = require('path');
const util = require('util');


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
        new (winston.transports.File)({ filename: path.join(__dirname, '../../logs/logs.txt') }),
        new (WebSocketLogger)({level: 'info'})
    ]
});

module.exports = logger;
