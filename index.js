"use strict";

let through2 = require('through2');

module.exports = function (rule) {
    return through2.obj(function (page, enc, next) {
        let spider = page.spider;
        page.$(rule).each(function() {
            spider.addUrl(page.$(this).attr('href'));
        });
        this.push(page);
        next();
    });
};
