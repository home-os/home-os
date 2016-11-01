app.factory('infos', function (socket) {

    var name = '';
    var version = '';

    socket.on('name', function (newName) {
        name = newName;
    });

    socket.on('version', function (newVersion) {
        version = newVersion;
    });

    socket.emit('ask-for-name');
    socket.emit('ask-for-version');

    return {
        name: function () {
            return name;
        },
        version: function () {
            return version;
        }
    };
});
