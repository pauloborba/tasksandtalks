import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
import request = require("request-promise");
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let sameMsg = ((elem, msg) => elem.element(by.name('msgList')).getText().then(text => text === msg));
let sameName = ((elem, name) => elem.element(by.name('nameList')).getText().then(text => text === name));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

var base_url = "http://localhost:3000/";

async function sendMessage(msg) {
    await $("textarea[name='writeMessage']").sendKeys(<string> msg);
    await element(by.buttonText('Enviar')).click();
}

async function assertTamanhoEqual(set,n) {
    await set.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(n));
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

async function assertElementsWithSameMsg(n,msg) {
    var allchats : ElementArrayFinder = element.all(by.name('chatlist'));
    var same = allchats.filter(elem => sameMsg(elem,msg));
    await assertTamanhoEqual(same,n); 
}

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I am at the task context page$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TntGui');
        await $("a[name='contexto']").click();
    })

    Given(/^I am at the task context page after sending a message$/, async () => {

    })

    Given(/^I can see that I am not logged in$/, async () => {
        var login_status = element(by.name('login')).getText();
        await expect(Promise.resolve(login_status)).to.eventually.equal('Não logado');
    });

    Given(/^I can see that I am logged in as "([^\"]*)"$/, async (name) => {
        var login_name = element(by.name('loginName')).getText();
        await login_name;
        await expect(login_name).to.eventually.equal(name);
    });
    
    When(/^I try to send the chat message "([^\"]*)" with "([^\"]*)" in the name field$/, async (msg, name) => {
        await loginAndMessage(name, msg);
    });

    When(/^I try to send the chat message "([^\"]*)"$/, async (msg) => {
        await sendMessage(msg);
    });

    When(/^I try to send a chat message with no content$/, async () => {
        await element(by.buttonText('Enviar')).click();
    });

    When(/^I try to send a chat message with no content with "([^\"]*)" in the name field$/, async (name) => {
        await login(name);
    });

    Then(/^I can see the chat message "([^\"]*)" that was sent by "([^\"]*)" in the chat thread$/, async (msg, name) => {
        var allchats : ElementArrayFinder = element.all(by.name('chatList'));
        allchats.filter(elem => pAND(sameMsg(elem,msg),sameName(elem,name))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Then(/^I cannot see the the chat message "([^\"]*)" in the chat thread$/, async (msg) => {
        var allchats : ElementArrayFinder = element.all(by.name('chatList'));
        allchats.filter(elem => pAND(sameMsg(elem,msg),sameName(elem,""))).then(elems => expect(Promise.resolve(elems.length)).to.not.equal(1));
    });

    Then(/^I cannot see an empty message in the chat thread$/, async () => {
        var allchats : ElementArrayFinder = element.all(by.name('chatList'));
        allchats.filter(elem => pAND(sameMsg(elem,""),true)).then(elems => expect(Promise.resolve(elems.length)).to.not.equal(1));
    });

    Then(/^I cannot see an empty message that was sent by "([^\"]*)" in the chat thread$/, async (name) => {
        var allchats : ElementArrayFinder = element.all(by.name('chatList'));
        allchats.filter(elem => pAND(sameMsg(elem,""),sameName(elem,name))).then(elems => expect(Promise.resolve(elems.length)).to.not.equal(1));
    });
})