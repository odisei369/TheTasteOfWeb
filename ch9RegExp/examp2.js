var input = "A string with 3 numbers in it... 42 and 88.";
var number = /\b\d+\b/g;
var match;
while (match = number.exec(input))
    console.log("Found", match[0], "at", match.index);
// → Found 3 at 14
//   Found 42 at 33
//   Found 88 at 40

function parseINI(string) {
    // Start with an object to hold the top-level fields
    var currentSection = {name: null, fields: []};
    var categories = [currentSection];

    string.split(/\r?\n/).forEach(function(line) {
        var match;
        if (/^\s*(;.*)?$/.test(line)) {
            return;
        } else if (match = line.match(/^\[(.*)\]$/)) {
            currentSection = {name: match[1], fields: []};
            categories.push(currentSection);
        } else if (match = line.match(/^(\w+)=(.*)$/)) {
            currentSection.fields.push({name: match[1],
                value: match[2]});
        } else {
            throw new Error("Line '" + line + "' is invalid.");
        }
    });

    return categories;
}