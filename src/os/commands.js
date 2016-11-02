function processCommand (stdin) {

    var stdout = '';

    if (stdin == "hello") {
        stdout = 'hello';
    } else if (stdin == 'start alarm clock') {
        stdout = 'start-alarm-clock';
    } else if (stdin == 'stop alarm clock') {
        stdout = 'stop-alarm-clock';
    } else {
        stdout = 'unknown command';
    }

    return stdout;
}


module.exports = {
    process: processCommand
};
