var assert = require("assert");
var parser = require("../xuparser_node");
var tst = require("./testutensils");
var fix = require("./astfixtures");

describe('xuparser', function() {
    describe('#parse()', function() {

        it('should render a simple AST, with two entities auto declared', function() {
            var lAST = parser.parse('msc { a,b; a => b [label="a simple script"];}');
            tst.assertequalJSON(lAST, fix.astSimple);
        });

        it("should produce an (almost empty) AST for empty input", function() {
            var lAST = parser.parse("msc{}");
            tst.assertequalJSON(lAST, fix.astEmpty);
        });
        it("should produce an AST even when non entity arcs are its only content", function() {
            var lAST = parser.parse('msc{--- [label="start"]; ... [label="no entities ..."]; ---[label="end"];}');
            tst.assertequalJSON(lAST, fix.astNoEntities);
        });
        it("should produce lowercase for upper/ mixed case arc kinds", function() {
            var lAST = parser.parse('msc { a, b, c, d; a NoTE a, b BOX b, c aBox c, d rbOX d;}');
            tst.assertequalJSON(lAST, fix.astBoxArcs);
        });
        it("should produce lowercase for upper/ mixed case options", function() {
            var lAST = parser.parse('msc{ARCGRADIENT="17",woRDwrAParcS="oN", HSCAle="1.2", widtH=800;a;}');
            tst.assertequalJSON(lAST, fix.astOptions);
        });
        it("should produce lowercase for upper/ mixed case attributes", function() {
            var lAST = parser.parse('msc{a [LaBEL="miXed", teXTBGcolOR="orange"]; a NOte a [LINEcolor="red", TEXTColoR="blue", ArcSkip="4"];}');
            tst.assertequalJSON(lAST, fix.astMixedAttributes);
        });
        it("should translate *colour to *color", function() {
            var lAST = parser.parse('msc { a [textcolOUr="green", textBGColour="cyan", linecolour="#ABCDEF"];}');
            tst.assertequalJSON(lAST, fix.astColourColor);
        });
        it("should produce only 'true' or 'false' for all variants of wordwraparcs", function() {
            tst.assertequalJSON(parser.parse('msc { wordwraparcs=true;}'), fix.astWorwraparcstrue);
            tst.assertequalJSON(parser.parse('msc { wordwraparcs="true";}'), fix.astWorwraparcstrue);
            tst.assertequalJSON(parser.parse('msc { wordwraparcs=on;}'), fix.astWorwraparcstrue);
            tst.assertequalJSON(parser.parse('msc { wordwraparcs="on";}'), fix.astWorwraparcstrue);
            tst.assertequalJSON(parser.parse('msc { wordwraparcs=1;}'), fix.astWorwraparcstrue);
            tst.assertequalJSON(parser.parse('msc { wordwraparcs="1";}'), fix.astWorwraparcstrue);
        });
        it("should throw a SyntaxError on an invalid program", function() {
            try {
                var lAST = parser.parse('a');
                var lStillRan = false;
                if (lAST) {
                    lStillRan = true;
                }
                assert.equal(lStillRan, false);
            } catch(e) {
                assert.equal(e.name, "SyntaxError");
            }

        });
    });

    describe('#parse() - xu specific extensions', function() {
        it('should render an AST, with an alt in it', function() {
            var lAST = parser.parse('msc { a,b,c; a => b; b alt c { b => c; c >> b; };}');
            tst.assertequalJSON(lAST, fix.astOneAlt);
        });

        it('should render an AST, with an alt in it', function() {
            var lAST = parser.parse('msc { a,b,c; a => b; a loop c { b alt c { b -> c [label="-> within alt"]; c >> b [label=">> within alt"]; } [label="label for alt"]; b >> a [label=">> within loop"];} [label="label for loop"]; a =>> a [label="happy-the-peppy - outside"];...;}');
            tst.assertequalJSON(lAST, fix.astAltWithinLoop);
        });
    });
});

/*

 msc {
 a,
 b,
 c;

 a => b;
 a loop c {
 b alt c {
 b -> c [label="blahs(i)"];
 c >> b [label="thing"];
 } [label="hunky dory"];
 b >> a;
 } [label="for each blah"];

 a =>> a [label="happy-the-peppy"];
 ...;
 }
 */