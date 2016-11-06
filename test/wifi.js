var wifi = require('node-wifi'); //require('../src/os/modules/wifi');

//Initialize wifi module
wifi.init({
    debug : true, //verbose output
    iface : null //set network interface
});

wifi.scan(function(err, networks) {
    if (err) {
        console.log(err);
    } else {
        console.log(networks);
    }
});

wifi.connect(function (err) {
    if (err) {
        console.log('wifi failed', err);
    } else {
        console.log('connected');
    }
});
