var sinon = require('sinon');
var chai = require('chai');
var should = chai.should();
var cssLinks = require('..');

describe('mrspider-css-links', function() {

    var validPage;
    var validSpider;
    var validnext;
    beforeEach(function() {
        validNext = function() {};
        validSpider = {};
        validPage = {
            $: function() {}
        }
    });

    it('should throw an error given a non existant page', function() {
        (function() {
            cssLinks(null, validSpider, validnext);
        }).should.throw(Error);
    });

    it('should throw an error given a page with no $ property', function() {
        delete validPage.$;
        (function() {
            cssLinks(validPage, validSpider, validNext);
        }).should.throw(Error);
    });
});