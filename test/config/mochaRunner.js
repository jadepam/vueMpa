const Mocha = require("mocha");
var mocha = new Mocha({
    reporter: 'mochawesome',
    reporterOptions: {
        reportDir: './docs/mochawesome-report',
        // quiet: true
    }
});
mocha.addFile("./test/service/router.spec.js");
mocha.run(function(){
    process.exit();
});
