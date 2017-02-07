// Modify these definitions...

topEnv["array"] = function()
{
    var array = [];
    for(var a = 0; a< arguments.length; a++)
    {
        array.push(arguments[a]);
    }
    return array;
};

topEnv["length"] = function(array){return array.length;};

topEnv["element"] = function(array, i)
{
    return array[i];
};

run("do(define(sum, fun(array,",
    "     do(define(i, 0),",
    "        define(sum, 0),",
    "        while(<(i, length(array)),",
    "          do(define(sum, +(sum, element(array, i))),",
    "             define(i, +(i, 1)))),",
    "        sum))),",
    "   print(sum(array(1, 2, 3))))");
// → 6