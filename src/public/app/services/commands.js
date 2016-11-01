app.factory('commands', function (socket) {

    var lines = [];

    socket.on('stdout', function (stdout) {
        console.log('stdout', stdout);
        lines.push({ type: 'output', cmd: stdout});
    });

    return {
        lines: function () {
            return lines;
        },
        process: function (input) {
            console.log('stdint', input);
            socket.emit('stdin', input);
            lines.push({ type: 'input', cmd: '> '+input});
        }
    };
});
