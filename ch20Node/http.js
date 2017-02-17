var http = require("http");
var server = http.createServer(function(request, response) {
    console.log(request);
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<h1>Hello!</h1><p>You asked for <code>" +
        request.url + "</code></p>");

    response.end();
});

//server.listen(8000);