'use strict';
app.controller('CommandCtrl', function($scope, infos, commands) {

    $scope.infos = infos;

    $scope.commands = commands;

    $scope.keyDown = function (event) {
        if(event.which === 13) {
            commands.process($scope.input)
            $scope.input = '';
        }
    }

});
