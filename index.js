"use strict";

module.exports = function(page, spider, next) {
    verifyArguments(page, spider, next);
};


function verifyArguments(page, spider, next) {
    if(!page) {
        throw new Error('css links requires a page.');
    }
    if(!page.$) {
        throw new Error('css links requires a jquery like object on $ property');
    }
}