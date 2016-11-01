function processCommand (stdin) {

    var stdout = '';

    if (stdin == "hello") {
        stdout = 'hello';
    }

    return stdout;
}


module.exports = {
    process: processCommand
};
