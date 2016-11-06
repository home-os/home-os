var wifi = require('../src/os/modules/wifi');

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
