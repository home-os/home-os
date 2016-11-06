const wifi = require('node-wifi');
const networks = require('../../../data/networks/networks.json');

wifi.init({
    debug : true,
    iface : 'wlan0'
});

function connect(callback) {
    wifi.connect({ ssid : "Livebox-C616", password : networks["Livebox-C616"] }, callback);
}

module.exports = {
    connect: connect
};
