// apt-get install mpg123

const spawn = require('child_process').spawn;

var p = null;

var isPlaying = false;

function play (filename) {
    p = spawn('mpg123', [filename]);
    isPlaying = true;
}

function stop () {
    if (null != p) {
        p.kill('SIGKILL');
        isPlaying = false;
    }
}

module.exports = {
    play: play,
    stop: stop,
    isPlaying: function () {
        return isPlaying;
    }
};
