// apt-get install amixer

const spawn = require('child_process').spawn;

function setVolume (value) {
    p = spawn('amixer set "PCM" '+value+'%' ['set', '"PCM"', value+'%']);
}

module.exports = {
    setVolume: setVolume
};
