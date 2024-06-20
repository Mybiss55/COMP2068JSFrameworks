const url = require('url');
const connect = require('connect');
const port = 3000;

const app = connect();

app.use((req, res, next) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('The answer is: ');
    res.write(String(calculate(req)))
    res.end();
}).listen(port);
console.log('Server running at http://localhost: ' + port + '/');

function calculate(req) {
    // Parse the url
    const queryObject = url.parse(req.url,true).query;
    // Get the operation and numbers
    let operation = queryObject.method;
    const num1 = parseInt(queryObject.x);
    const num2 = parseInt(queryObject.y);
    // Calculate the result
    let result;
    if (operation === 'add') {
        result = num1 + num2;
        operation = '+';
    } else if (operation === 'subtract') {
        result = num1 - num2;
        operation = '-';
    } else if (operation === 'multiply') {
        result = num1 * num2;
        operation = '*';
    } else if (operation === 'divide') {
        result = num1 / num2;
        operation = '/';
    } else {
        return 'Invalid operation';
    }
    if (isNaN(result)) {
        return 'Invalid input';
    }
    result = num1 + ' ' + operation + ' ' + num2 + ' = ' + result;
    return result;
    // x method y

}