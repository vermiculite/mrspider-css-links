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
            $: cheerio.load('<h1><a class="test" href="http://abc.com/test">asd;k;ad ;aksd</a><a href="http://abc.com/test/1">asd;k;ad ;aksd</a><a href="http://abc.com/test/2">asd;k;ad ;aksd</a><a href="http://abc.com/test/3">asd;k;ad ;aksd</a></h1>'),
            spider: validSpider
        }
        validCssLink = cssLinks(validRule);
    });

    it('should call addUrl of the spider given content with a link for the passed rule', function() {
        validPage.spider.addUrl = sinon.spy();
        validCssLink._transform(validPage, validNext);
        validPage.spider.addUrl.calledOnce.should.equal(true);
    });

    it('should call addUrl of the spider given content with a link for the passed rule with the url of the href', function() {
        validPage.spider.addUrl = sinon.spy();
        validCssLink._transform(validPage, validNext);
        validPage.spider.addUrl.calledOnce.should.equal(true);
        validSpider.addUrl.firstCall.args[0].should.equal('http://abc.com/test');
    });

    it('should call addUrl for each url matched givena rule that matches several links.', function() {
        var cssLink = cssLinks('h1 a');
        validPage.spider.addUrl = sinon.spy();
        cssLink._transform(validPage, validNext);
        validPage.spider.addUrl.calledWith('http://abc.com/test').should.equal(true);
        validPage.spider.addUrl.calledWith('http://abc.com/test/1').should.equal(true);
        validPage.spider.addUrl.calledWith('http://abc.com/test/2').should.equal(true);
        validPage.spider.addUrl.calledWith('http://abc.com/test/3').should.equal(true);
        validPage.spider.addUrl.calledWith('http://abc.com/test/4').should.equal(false);
    });
});
