import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sameDescricao = ((elem, descricao) => elem.element(by.name('descricaoList')).getText().then(text => text === descricao ));
let sameName = ((elem, name) => elem.element(by.name('nomeList')).getText().then(text => text === name));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

defineSupportCode(function ({ Given, When, Then }) {
	Given(/^I am at events page$/, async () => {
		await browser.get("http://localhost:4200/");
		await expect(browser.getTitle()).to.eventually.equal('TntGui');
		await element(by.buttonText('Eventos')).click();
	});
	
	When('I try to import the event {stringInDoubleQuotes} of Google Calendar to task {stringInDoubleQuotes}', async (name, descricao) => {
		await $("input[name='ImputCalendar']").sendKeys(<string> name);
		await $("input[name='ImputCalendarTarefa']").sendKeys(<string> descricao);
		await element(by.buttonText('Associar evento por Calendar')).click();
	});
	
	Then('I can see {stringInDoubleQuotes} with task {stringInDoubleQuotes} in event list', async (name, descricao) => {
	var allevents : ElementArrayFinder = element.all(by.name('eventList'));
	await allevents.filter(elem => pAND(sameDescricao(elem,descricao), sameName(elem,name))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
	});

})
