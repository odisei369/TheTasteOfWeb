specialForms["set"] = function(args, env) {

    if (args.length != 2 || args[0].type != "word")
        throw new SyntaxError("Bad use of set");
    var value = evaluate(args[1], env);
    var varName = args[0].name;
    var scope = env;
    do
    {
        if (Object.prototype.hasOwnProperty.call(scope, varName))
        {
            scope[varName] = value;
            return value;
        }
    }
    while((scope = Object.getPrototypeOf(scope)) != null);
    throw new ReferenceError();
};

run("do(define(x, 4),",
    "   define(setx, fun(val, set(x, val))),",
    "   setx(50),",
    "   print(x))");
// → 50
run("set(quux, true)");
// → Some kind of ReferenceError