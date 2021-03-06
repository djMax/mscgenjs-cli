/* jshint phantom:true, strict: false */
/* globals renderVectorInThePage */
var system = require('system');

var gPage       = system.args[1];
var gASTString  = system.args[2];
var gModuleBase = system.args[4];
var gRequirePath = system.args[5];

var page = require('webpage').create();

page.onCallback = function(pSVG){
    console.log(pSVG);
    phantom.exit();
};

page.open(gPage, function(/*pStatus*/) {
    page.injectJs(gRequirePath);
    page.evaluate(
        function(pASTString,pModuleBase){
            renderVectorInThePage(pASTString,pModuleBase);
        },
        gASTString,
        gModuleBase
    );
});
