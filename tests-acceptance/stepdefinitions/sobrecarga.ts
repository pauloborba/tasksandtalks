import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sameName = ((elem, name) => elem.element(by.name('nomelist')).getText().then(text => text === name));

async function cadastrarProjeto(name, sobrecarga) {
    await $("input[name='namebox']").sendKeys(<string> name);
    await $("input[name='testing']").click();
    await $("input[name='sobrecargabox']").sendKeys(<string> sobrecarga);
    await element(by.buttonText('Adicionar')).click();
}

async function checarIndex(array: ElementArrayFinder, name, expectedIndex: number) {
    return await array.findIndex(elem => sameName(elem, name)).then
        (index => expect(Promise.resolve(index)).to.eventually.equal(expectedIndex));
}

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I am at the projects page$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TntGui');
        await $("a[name='projetos']").click();
    })    

    Given(/^I can see the projects "([^\"]*)" with overwhelm level "(\d*)", "([^\"]*)" with overwhelm level "(\d*)", "([^\"]*)" with overwhelm level "(\d*)"$/, 
        async (name1, sobrecarga1, name2, sobrecarga2, name3, sobrecarga3) => {
            //Adicionando projetos
            cadastrarProjeto(name1, sobrecarga1).
            then(() => cadastrarProjeto(name2, sobrecarga2).
            then(() => cadastrarProjeto(name3, sobrecarga3).then(() =>{
                //checar se foram adicionados
                var allProjetos : ElementArrayFinder = element.all(by.name('projetoList'));
                allProjetos.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(3));
            })));
    })

    When(/^I select the option sort projects in descending order$/, async() => {
        browser.sleep(1000).then(() =>{
            $("[name='dropdown']").click().
                then(() => $("[name='descending']").click());
        });
    })

    Then(/^I can see that the project order is indeed "([^\"]*)",  "([^\"]*)", "([^\"]*)"$/, 
        async(name1, name2, name3) => {
            var allProjetos : ElementArrayFinder = element.all(by.name('projetoList'));
            //checar nome 1
            checarIndex(allProjetos, name1, 0);
            //checar nome 2
            checarIndex(allProjetos, name2, 1);
            //checar nome 3
            checarIndex(allProjetos, name3, 2);
    })
})