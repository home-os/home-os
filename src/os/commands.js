function processCommand (stdin) {

    var stdout = '';

    if (stdin == "hello") {
        stdout = 'hello';
    } else if (stdin == 'start music') {
        stdout = 'start-music';
    } else if (stdin == 'stop music') {
        stdout = 'stop-music';
    } else {
        stdout = 'unknown command';
    }

    return stdout;
}


module.exports = {
    process: processCommand
};
