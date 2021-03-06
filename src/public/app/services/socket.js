app.factory('socket', function ($rootScope) {
    var socket = io.connect();

    return {
        on: function (eventName, callback) {
            socket.on(eventName, function (data) {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback && callback (data);
                        //callback.apply(socket, socket, args);
                    }
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data);
        }
    };
});
