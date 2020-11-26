import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sameTexts = ((elem, text1, text2, text3) => elem.getText().then(textElem => (textElem === text1 || textElem === text2 || textElem === text3)));
let sameText = ((elem, text) => elem.getText().then(textElem => (textElem === text)));

let samePorc = ((elem, porc) => elem.getText().then(text => text === porc));
let hasSomething = ((elem, smtg) => elem.getText().then(text => text.toString().match(smtg) || text.toString().search(smtg) > 0 || text.toString().search(smtg.substring(0, smtg.length-1)) > 0 || text.toString() === smtg));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)));

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^Eu estou na pagina 'Estatisticas'$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TntGui');
        await $("a[name='estatisticas']").click();
    });

    Given(/^Eu vejo um menu com as subsecoes: '([^\"]*)', '([^\"]*)' e '([^\"]*)'$/, async (menu1, menu2, menu3) => {
        var arr = element.all(by.name("menu"));
        await arr.filter(elem => sameText(elem, menu1.toString())).then
                   (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        await arr.filter(elem => sameText(elem, menu2.toString())).then
                   (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        await arr.filter(elem => sameText(elem, menu3.toString())).then
                   (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    When(/^Eu seleciono a subseção '([^\"]*)'$/, async (menu) => {
        var arr = element.all(by.name("menu"));
        arr = arr.filter(elem => sameText(elem, menu.toString()));
        await arr.get(0).click();
    });

    Then(/^Eu vejo que '([^\"]*)' do total de projetos está '([^\"]*)'$/, async (porc, estado) => {
        var arr : ElementArrayFinder = element.all(by.name("porc"));
        await arr.filter(elem => samePorc(elem, porc.toString())).then
                   (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        var arr2 : ElementArrayFinder = element.all(by.name("quant"));
        await arr2.filter(elem => hasSomething(elem, estado.toString())).then
                   (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Then(/^Eu vejo que ha '(\d*)' projetos '([^\"]*)'$/, async (quant, estado) => {
        var arr : ElementArrayFinder = element.all(by.name("quant"));
        await arr.filter(elem => hasSomething(elem, quant.toString())).then
                   (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        var arr2 : ElementArrayFinder = element.all(by.name("quant"));
        await arr2.filter(elem => hasSomething(elem, estado.toString())).then
                   (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Then(/^Eu vejo que a '([^\"]*)' dos projetos em '([^\"]*)' é '([\d+(\.\d+)?]*)'$/, async (tipo, grandeza, valor) => {
        var nomeElemento;
        if(tipo.toString() == 'duração média'){
            nomeElemento = 'duracao';
            valor = valor.toString();
        }
        else{
            nomeElemento = 'criacao';
            valor = parseFloat(valor.toString()).toFixed(1);
        }
        var arr : ElementArrayFinder = element.all(by.name(nomeElemento));
        await arr.filter(elem => hasSomething(elem, valor)).then
                   (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

}) 