import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementFinder, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^Eu estou na seção "([^\"]*)"$/, async (pageName) => {
        await browser.get("http://localhost:4200/thread");
        const sectionTitle = element(by.id('section-title'));
        await expect(sectionTitle.getText()).to.eventually.equal(pageName);
    })
})
