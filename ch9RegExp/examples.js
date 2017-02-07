var re1 = new RegExp("abc");
var re2 = /abc/;
var eighteenPlus = /eighteen\+/;
console.log(/abc/.test("abcde"));
// → true
console.log(/abc/.test("abxde"));
// → false
console.log(/[0123456789]/.test("in 1992"));
// → true
console.log(/[0-9]/.test("in 1992"));
// → true
console.log(/[0123456789]/.test("in 1992"));
// → true
console.log(/[0-9]/.test("in 1992"));
// → true
var notBinary = /[^01]/;
console.log(notBinary.test("1100100010100110"));
// → false
console.log(notBinary.test("1100100010200110"));
// → true
console.log(/'\d+'/.test("'123'"));
// → true
console.log(/'\d+'/.test("''"));
// → false
console.log(/'\d*'/.test("'123'"));
// → true
console.log(/'\d*'/.test("''"));
// → true
var neighbor = /neighbou?r/;
console.log(neighbor.test("neighbour"));
// → true
console.log(neighbor.test("neighbor"));
// → true
var dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
console.log(dateTime.test("30-1-2003 8:45"));
// → true
var cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test("Boohoooohoohooo"));
// → true
var match = /\d+/.exec("one two 100");
console.log(match);
// → ["100"]
console.log(match.index);
// → 8
console.log("one two 100".match(/\d+/));
// → ["100"]
var quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'"));
// → ["'hello'", "hello"]
console.log(/bad(ly)?/.exec("bad"));
// → ["bad", undefined]
console.log(/(\d)+/.exec("123"));
// → ["123", "3"]

//Date

console.log(new Date());
// → Wed Dec 04 2013 14:24:57 GMT+0100 (CET)

console.log(new Date(2009, 11, 9));
// → Wed Dec 09 2009 00:00:00 GMT+0100 (CET)
console.log(new Date(2009, 11, 9, 12, 59, 59, 999));
// → Wed Dec 09 2009 12:59:59 GMT+0100 (CET)

console.log(new Date(2013, 11, 19).getTime());
// → 1387407600000
console.log(new Date(1387407600000));
// → Thu Dec 19 2013 00:00:00 GMT+0100 (CET)


function findDate(string) {
    var dateTime = /(\d{1,2})-(\d{1,2})-(\d{4})/;
    var match = dateTime.exec(string);
    return new Date(Number(match[3]),
        Number(match[2]) - 1,
        Number(match[1]));
}
console.log(findDate("30-1-2003"));
// → Thu Jan 30 2003 00:00:00 GMT+0100 (CET)

console.log(/cat/.test("concatenate"));
// → true
console.log(/\bcat\b/.test("concatenate"));
// → false

var animalCount = /\b\d+ (pig|cow|chicken)s?\b/;
console.log(animalCount.test("15 pigs"));
// → true
console.log(animalCount.test("15 pigchickens"));
// → false

//replace

console.log("papa".replace("p", "m"));
// → mapa

console.log("Borobudur".replace(/[ou]/, "a"));
// → Barobudur
console.log("Borobudur".replace(/[ou]/g, "a"));
// → Barabadar

console.log(
    "Hopper, Grace\nMcCarthy, John\nRitchie, Dennis"
        .replace(/([\w ]+), ([\w ]+)/g, "$2 $1"));
// → Grace Hopper
//   John McCarthy
//   Dennis Ritchie

var s = "the cia and fbi";
console.log(s.replace(/\b(fbi|cia)\b/g, function(str) {
    return str.toUpperCase();
}));
// → the CIA and FBI

var stock = "1 lemon, 2 cabbages, and 101 eggs";
function minusOne(match, amount, unit) {
    amount = Number(amount) - 1;
    if (amount == 1) // only one left, remove the 's'
        unit = unit.slice(0, unit.length - 1);
    else if (amount == 0)
        amount = "no";
    return amount + " " + unit;
}
console.log(stock.replace(/(\d+) (\w+)/g, minusOne));
// → no lemon, 1 cabbage, and 100 eggs

//greedy match as many as it could

function stripComments(code) {
    return code.replace(/\/\/.*|\/\*[^]*\*\//g, "");
}
console.log(stripComments("1 + /* 2 */3"));
// → 1 + 3
console.log(stripComments("x = 10;// ten!"));
// → x = 10;
console.log(stripComments("1 /* a */+/* b */ 1"));
// → 1  1



//non greedy(with ? sign) match less characters as posible
// (+?, *?, ??, {}?)
function stripComments(code) {
    return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}
console.log(stripComments("1 /* a */+/* b */ 1"));
// → 1 + 1

var name = "dea+hl[]rd";
var text = "This dea+hl[]rd guy is super annoying.";
//put a backslash before any character that is not alphabetic and not a new  line space e.c.
// $& whole match
var escaped = name.replace(/[^\w\s]/g, "\\$&");
// create regexp that find name in a string
var regexp = new RegExp("\\b(" + escaped + ")\\b", "gi");
//add underscores to match
console.log(text.replace(regexp, "_$1_"));
// → This _dea+hl[]rd_ guy is super annoying.

//search method
// is not good because we can't define offset
console.log("  word".search(/\S/));
// → 2
console.log("    ".search(/\S/));
// → -1

//there is trick to do this

//glogal atribute should be on
var pattern = /y/g;
//we define last index as point from where to search
pattern.lastIndex = 3;
var match = pattern.exec("xyzzy");
console.log(match.index);
// → 4
//exec automaticaly change lastIndex to character after last match
console.log(pattern.lastIndex);
// → 5


//lastIndex of regExp is not returned to 0 automaticaly
// so you should do it by changing it
var digit = /\d/g;
console.log(digit.exec("here it is: 1"));
// → ["1"]
console.log(digit.exec("and now: 1"));
// → null

//match return all matches
console.log("Banana".match(/an/g));
// → ["an", "an"]