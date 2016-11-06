var wifi = require('../src/os/modules/wifi');

wifi.connect(function (err) {
    if (err) {
        console.log('wifi failed', err);
    } else {
        console.log('connected');
    }
});
