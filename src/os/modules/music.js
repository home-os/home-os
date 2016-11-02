// apt-get install mpg123

const exec = require('child_process').exec;

var p = null;


function play (filename) {
    p = exec('mpg123 '+filename, function (error, stdout, stderr) {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
    });
}

function stop () {
    if (null != p) {
        p.kill('SIGHUP');
    }
}

module.exports = {
    play: play,
    stop: stop
};
