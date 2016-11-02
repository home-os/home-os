// apt-get install mpg123

const spawn = require('child_process').spawn;

var p = null;


function play (filename) {
    p = spawn('mpg123 ', [filename]);
}

function stop () {
    if (null != p) {
        p.kill('SIGKILL');
    }
}

module.exports = {
    play: play,
    stop: stop
};
