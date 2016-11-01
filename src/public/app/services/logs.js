app.factory('logs', function (socket) {

    /*socket.emit('get-state');

    socket.on('state', function (state) {
        console.log('state' , state);
        if (state === 'active') {
            $location.path('/main');
        } else if (state === 'post-connect-android') {
            $location.path('/post/connect/android');
        } else if (state === 'not-connected') {
            $location.path('/connect');
        }
    });*/

    var logs = [];

    socket.on('logs', function (msg) {
        console.log('logs', msg);
        logs.push(msg);
    });

    return {
        logs: function () {
            return logs;
        }
    };
});
