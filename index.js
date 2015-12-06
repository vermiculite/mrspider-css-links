"use strict";

function verifyArguments(page, spider, next) {
    if (!page) {
        throw new Error('css links requires a page.');
    }
    if (!page.$) {
        throw new Error('css links requires a jquery like object on $ property');
    }
    if (!spider) {
        throw new Error('css links requires a spider be passed.');
    }
    if (typeof  spider.addUrl !== 'function') {
        throw new Error('css links requires to spider to have an addUrl function');
    }
    if (typeof next !== 'function') {
        throw new Error('css-links requires a next function to be passed.');
    }
}


module.exports = function (rule) {
    return function (page, spider, next) {
        verifyArguments(page, spider, next);
        page.$(rule).each(function() {
            spider.addUrl(page.$(this).attr('href'));
        });
        next();
    }
};
