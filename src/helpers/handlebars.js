const Handlebars = require('handlebars');

// Định nghĩa helper eqSelect
Handlebars.registerHelper('eqSelect', function(a, b) {
    return a === b;
});

module.exports = Handlebars;