var names = ["Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"];
function dayName(number) {
    return names[number];
}

console.log(dayName(1));
// → Monday

var dayName = function() {
    var names = ["Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"];
    return function(number) {
        return names[number];
    };
}();

console.log(dayName(3));
// → Wednesday

(function() {
    function square(x) { return x * x; }
    var hundred = 100;

    console.log(square(hundred));
})();
// → 10000


var weekDay = function() {
    var names = ["Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"];
    return {
        name: function(number) { return names[number]; },
        number: function(name) { return names.indexOf(name); }
    };
}();

console.log(weekDay.name(weekDay.number("Sunday")));
// → Sunday

function evalAndReturnX(code) {
    eval(code);
    return x;
}

console.log(evalAndReturnX("var x = 2"));
// → 2

var plusOne = new Function("n", "return n + 1;");
console.log(plusOne(4));
// → 5