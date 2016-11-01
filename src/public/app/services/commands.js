app.factory('commands', function (socket) {

    var stdouts = [];

    socket.on('stdout', function (stdout) {
        // console.log('')
        stdouts.push(stdout);
    });

    return {
        stdouts: function () {
            return stdouts;
        },
        process: function (input) {
            socket.emit('stdin', input);
        }
    };
});
