ms genny
========

*scratch* 

- simplified syntax a.c.t. mscgen
- automatic declaration of entities
- explicit declaration of entities possible (to make the order explicit)
- supports all arcs mscgen does
- supports all options mscgen does
- supports labels
- no support for colors, arcskip, id, url, idurl

Why?
----
*scratch*

Me lazy.

usage
-----
*scratch*

Write in ms genny, save in mscgen

example
-------
*scratch; maybe bit shorter; also insert pictures*

    a -> b : ab();
    b -> c : bc(TRUE);
    c =>> c : process(1);
    b <<= c : callback();
    |||;
    --- : If more to run;
    a -> a : next();
    a => c : ac1();
    b << c : cb(true);
    b -> b : stalled(...);
    a << b : ab() = FALSE,
    c note c : Just a note ...;

things
------

Labels usually don't need quotes, unless a ; (end arc line declaration)
or a , (end arc in case you need) is in them:

    a => b : "hello b";  # valid
    a => b :  hello b;   # valid
    a => b : "hello; b"; # valid
    a => b :  hello; b;  # not valid 
    a => b : "hello, b"; # valid
    a => b :  hello, b;  # not valid

formal syntax
-------------
[peg][1]

[1]: script/node/mscgensmplparser.pegjs