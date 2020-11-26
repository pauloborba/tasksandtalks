import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let sameMsg = ((elem, msg) => elem.element(by.name('msglist')).getText().then(text => text === msg));
let sameName = ((elem, name) => elem.element(by.name('nameList')).getText().then(text => text === name));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

async function sendMessage(msg) {
    await $("textarea[name='writeMessage']").sendKeys(<string> msg);
    await element(by.buttonText('Enviar')).click();
}

async function login(name) {
    await $("input[name='writeName']").sendKeys(<string> name);
    await element(by.buttonText('Enviar')).click();
}

async function loginAndMessage(name, msg) {
    await $("input[name='writeName']").sendKeys(<string> name);
    await $("textarea[name='writeMessage']").sendKeys(<string> msg);
    await element(by.buttonText('Enviar')).click();
}

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I am at the task context page$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TntGui');
        await $("a[name='contexto']").click();
    })

    Given(/^I can see that I am not logged in$/, async () => {
        var login_status = element(by.name('login')).getText();
        expect(login_status).to.eventually.equal('Não logado');
    });

    When(/^I try to send the chat message "([^\"]*)" with "([^\"]*)" in the name field$/, async (msg, name) => {
        await loginAndMessage(name, msg);
    });

    Then(/^I can see the chat message "([^\"]*)" that was sent by "([^\"]*)" in the chat thread$/, async (msg, name) => {
        var allchats : ElementArrayFinder = element.all(by.name('chatList'));
        allchats.filter(elem => pAND(sameMsg(elem,msg),sameName(elem,name))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });
})