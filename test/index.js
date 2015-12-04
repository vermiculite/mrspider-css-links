var sinon = require('sinon');
var chai = require('chai');
var should = chai.should();
var cssLinks = require('..');
var cheerio = require('cheerio');

describe('mrspider-css-links', function() {

    var validPage;
    var validSpider;
    var validNext;
    var validCssLink;
    var validRule;
    beforeEach(function() {
        validRule = 'h1 a.test';
        validNext = function() {};
        validSpider = {
            addUrl: function() {}
        };
        validPage = {
            $: cheerio.load('<h1><a class="test" href="http://abc.com/test">asd;k;ad ;aksd</a><a href="http://abc.com/test/1">asd;k;ad ;aksd</a><a href="http://abc.com/test/2">asd;k;ad ;aksd</a><a href="http://abc.com/test/3">asd;k;ad ;aksd</a></h1>')
        }
        validCssLink = cssLinks(validRule);
    });

    it('should throw an error given a non existant page', function() {
        (function() {
            validCssLink(null, validSpider, validNext);
        }).should.throw(Error);
    });

    it('should throw an error given a page with no $ property', function() {
        delete validPage.$;
        (function() {
            validCssLink(validPage, validSpider, validNext);
        }).should.throw(Error);
    });

    it('should throw an error given no spider', function() {
        (function() {
            validCssLink(validPage, null, validNext);
        }).should.throw(Error);
    });

    it('should throw an error given a spider with no addUrl function', function() {
        delete validSpider.addUrl;
        (function() {
            validCssLink(validPage, validSpider, validNext);
        }).should.throw(Error)
    });

    it('should throw an error given a nonexistant next', function() {
        (function() {
            validCssLink(validPage, validSpider, null);
        }).should.throw(Error);
    });

    it('should call addUrl of the spider given content with a link for the passed rule', function() {
        validSpider.addUrl = sinon.spy();
        validCssLink(validPage, validSpider, validNext);
        validSpider.addUrl.calledOnce.should.equal(true);
    });

    it('should call addUrl of the spider given content with a link for the passed rule with the url of the href', function() {
        validSpider.addUrl = sinon.spy();
        validCssLink(validPage, validSpider, validNext);
        validSpider.addUrl.calledOnce.should.equal(true);
        validSpider.addUrl.firstCall.args[0].should.equal('http://abc.com/test');
    });

    it('should call addUrl for each url matched givena rule that matches several links.', function() {
        var cssLink = cssLinks('h1 a');
        validSpider.addUrl = sinon.spy();
        cssLink(validPage, validSpider, validNext);
        validSpider.addUrl.calledWith('http://abc.com/test').should.equal(true);
        validSpider.addUrl.calledWith('http://abc.com/test/1').should.equal(true);
        validSpider.addUrl.calledWith('http://abc.com/test/2').should.equal(true);
        validSpider.addUrl.calledWith('http://abc.com/test/3').should.equal(true);
        validSpider.addUrl.calledWith('http://abc.com/test/4').should.equal(false);
    });
});
