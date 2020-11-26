import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, protractor } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");
import { Alert } from 'selenium-webdriver';

var base_url = "http://localhost:3000/";

var hasClass = function (element, cls) {
    return element.getAttribute('class').then(function (classes) {
        return classes.split(' ').indexOf(cls) !== -1;
    });
};

defineSupportCode(function ({ Given, When, Then }) {

    Given(/^I am looking at a context with an emailthread option$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TntGui');
    });

    Given('I am looking at an emailthread',  async function () {
        await $("a[name='thread']").click();
    });

    When(/^I try to create a valid reminder with date '([^\"]*)'$/, async ( datadelembrete ) => {
        await $("input[name='lembretededata']").sendKeys(<string> datadelembrete);
        await element(by.buttonText('Adicionar Lembrete')).click();
    });

    Then(/^I see an alert of a successful reminder$/, async () => {
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.alertIsPresent(), 5000);
        let abc:Alert = browser.switchTo().alert();
        abc = browser.switchTo().alert();
        await expect(abc.getText()).to.eventually.equal('Lembrete de data do email salvo com sucesso');
        abc.dismiss();
    });

    When(/^I try to create an invalid reminder with date '([^\"]*)'$/, async ( datadelembrete ) => {
        await $("input[name='lembretededata']").sendKeys(<string> datadelembrete);
        await element(by.buttonText('Adicionar Lembrete')).click();
    });

    Then(/^I see an alert of an unsuccessful reminder$/, async () => {
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.alertIsPresent(), 5000);
        let abc:Alert = browser.switchTo().alert();
        abc = browser.switchTo().alert();
        await expect(abc.getText()).to.eventually.equal('Nao foi possivel salvar o lembrete do email');
        abc.dismiss();
    });
})