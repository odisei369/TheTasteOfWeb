var Router = module.exports = function() {
    this.routes = [];
};

Router.prototype.add = function(method, url, handler) {
    this.routes.push({method: method,
        url: url,
        handler: handler});
};

Router.prototype.resolve = function(request, response) {
    var path = require("url").parse(request.url).pathname;

    return this.routes.some(function(route) {
        var match = route.url.exec(path);
        if (!match || route.method != request.method)
            return false;

        var urlParts = match.slice(1).map(decodeURIComponent);
        route.handler.apply(null, [request, response]
            .concat(urlParts));
        return true;
    });
};

var talks = Object.create(null);

router.add("GET", /^\/talks\/([^\/]+)$/,
    function(request, response, title) {
        if (title in talks)
            respondJSON(response, 200, talks[title]);
        else
            respond(response, 404, "No talk '" + title + "' found");
    });

router.add("DELETE", /^\/talks\/([^\/]+)$/,
    function(request, response, title) {
        if (title in talks) {
            delete talks[title];
            registerChange(title);
        }
        respond(response, 204, null);
    });

function readStreamAsJSON(stream, callback) {
    var data = "";
    stream.on("data", function(chunk) {
        data += chunk;
    });
    stream.on("end", function() {
        var result, error;
        try { result = JSON.parse(data); }
        catch (e) { error = e; }
        callback(error, result);
    });
    stream.on("error", function(error) {
        callback(error);
    });
}

router.add("PUT", /^\/talks\/([^\/]+)$/,
    function(request, response, title) {
        readStreamAsJSON(request, function(error, talk) {
            if (error) {
                respond(response, 400, error.toString());
            } else if (!talk ||
                typeof talk.presenter != "string" ||
                typeof talk.summary != "string") {
                respond(response, 400, "Bad talk data");
            } else {
                talks[title] = {title: title,
                    presenter: talk.presenter,
                    summary: talk.summary,
                    comments: []};
                registerChange(title);
                respond(response, 204, null);
            }
        });
    });

router.add("POST", /^\/talks\/([^\/]+)\/comments$/,
    function(request, response, title) {
        readStreamAsJSON(request, function(error, comment) {
            if (error) {
                respond(response, 400, error.toString());
            } else if (!comment ||
                typeof comment.author != "string" ||
                typeof comment.message != "string") {
                respond(response, 400, "Bad comment data");
            } else if (title in talks) {
                talks[title].comments.push(comment);
                registerChange(title);
                respond(response, 204, null);
            } else {
                respond(response, 404, "No talk '" + title + "' found");
            }
        });
    });

router.add("GET", /^\/talks$/, function(request, response) {
    var query = require("url").parse(request.url, true).query;
    if (query.changesSince == null) {
        var list = [];
        for (var title in talks)
            list.push(talks[title]);
        sendTalks(list, response);
    } else {
        var since = Number(query.changesSince);
        if (isNaN(since)) {
            respond(response, 400, "Invalid parameter");
        } else {
            var changed = getChangedTalks(since);
            if (changed.length > 0)
                sendTalks(changed, response);
            else
                waitForChanges(since, response);
        }
    }
});

var waiting = [];

function waitForChanges(since, response) {
    var waiter = {since: since, response: response};
    waiting.push(waiter);
    setTimeout(function() {
        var found = waiting.indexOf(waiter);
        if (found > -1) {
            waiting.splice(found, 1);
            sendTalks([], response);
        }
    }, 90 * 1000);
}

var changes = [];

function registerChange(title) {
    changes.push({title: title, time: Date.now()});
    waiting.forEach(function(waiter) {
        sendTalks(getChangedTalks(waiter.since), waiter.response);
    });
    waiting = [];
}
function getChangedTalks(since) {
    var found = [];
    function alreadySeen(title) {
        return found.some(function(f) {return f.title == title;});
    }
    for (var i = changes.length - 1; i >= 0; i--) {
        var change = changes[i];
        if (change.time <= since)
            break;
        else if (alreadySeen(change.title))
            continue;
        else if (change.title in talks)
            found.push(talks[change.title]);
        else
            found.push({title: change.title, deleted: true});
    }
    return found;
}

function sendTalks(talks, response) {
    respondJSON(response, 200, {
        serverTime: Date.now(),
        talks: talks
    });
}

