function processCommand (stdin) {

    var cmd = {
        id: '',
        args: {},
        stdout: ''
    };

    if (stdin == "hello") {
        cmd.id = 'hello';
        cmd.stdout = 'hello';
    } else if (stdin == 'start music') {
        cmd.id = 'start-music';
        cmd.stdout = 'start-music';
    } else if (stdin == 'stop music') {
        cmd.id = 'stop-music';
        cmd.stdout = 'stop-music';
    } else if (stdin.match(/set volume ([0-9]+)/)) {
        var match = stdin.match(/set volume ([0-9]+)/);
        cmd.id = 'set-volume';
        cmd.args.value = match[1];
        cmd.stdout = 'set-music '+match[1];

    } else {
        cmd.stdout = 'unknown command';
    }

    return cmd;
}


module.exports = {
    process: processCommand
};
