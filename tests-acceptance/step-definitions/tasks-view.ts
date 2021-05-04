import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementFinder, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

defineSupportCode(function ({ Given, When, Then }) {
    let nowDate: string;

    Given(/^eu estou na página de projetos$/, async () => {
        await browser.get("http://localhost:4200/projetos");
        await expect(browser.getTitle()).to.eventually.equal('TntGui');
    });

    Given(/^eu posso visualizar o projeto "([^\"]*)"$/, async (name) => {
        await $("input[name='namebox']").sendKeys(<string>name);
        await $("button[name='adicionar']").click();
    });

    Given(/^eu posso seguir para a página do projeto "([^\"]*)"$/, async (name) => {
        await element(by.linkText(<string>name)).click();
    });

    Given(/^eu posso visualizar uma tarefa "([^\"]*)"$/, async (name) => {
        await $("input[name='descbox']").sendKeys(<string>name);
        await $("input[name='datebox']").sendKeys(Date.now());
        await $("button[name='adicionar']").click();
    });

    Given(/^eu posso seguir para a página da tarefa "([^\"]*)"$/, async (name) => {
        await element(by.linkText(<string>name)).click();
    });

    Given(/^eu estou na página da tarefa "([^\"]*)"$/, async (taskName) => {
        const taskTitle = element(by.id('tarefa-titulo'));
        await expect(taskTitle.getText()).to.eventually.equal(taskName);
    });

    When(/^eu indico a atualização das informações da tarefa$/, async () => {
        await element(by.buttonText('Atualizar')).click();
        nowDate = `${new Date(Date.now()).toISOString().substr(0, 10).split('-').reverse().join('/')} - ${new Date(Date.now()).toLocaleTimeString('en-US')}`;
    });

    Then(/^eu vejo a data atual na coluna "([^\"]*)"$/, async (columnName) => {
        let tableData = await element(by.id("tabela-atualizacao"));
        let rows = await tableData.all(by.tagName("tr"));

        await expect(rows.length).to.equal(2);
        await expect(rows[0].getText()).to.eventually.equal(columnName);
        await expect(rows[1].getText()).to.eventually.equal(nowDate);
    });

    Given(/^eu vejo que a mensagem "([^\"]*)" com a coluna "([^\"]*)" marcada com "([^\"]*)" e a coluna "([^\"]*)" marcado com "([^\"]*)"$/, async (message, columnOne, statusOne, columnTwo, statusTwo) => {
        let tableRow = await element(by.id("tabela-mensagens")).all(by.tagName("tr"));

        let header = await tableRow[0].all(by.tagName("th"));
        let lineOne = await tableRow[1].all(by.tagName("td"));
        let lineTwo = await tableRow[2].all(by.tagName("td"));

        await expect(header.length).to.equal(6);
        await expect(lineOne.length).to.equal(6);
        await expect(lineTwo.length).to.equal(6);

        

        if (await lineOne[0].getText() === message) {
            await expect(lineOne[0].getText()).to.eventually.equal(message);
            
            await expect(header[2].getText()).to.eventually.contain(columnOne);
            await expect(lineOne[2].getText()).to.eventually.equal(statusOne);
    
            await expect(header[4].getText()).to.eventually.equal(columnTwo);
            await expect(lineOne[4].getText()).to.eventually.equal(statusTwo);
        } else {
            await expect(lineTwo[0].getText()).to.eventually.equal(message);
            
            await expect(header[2].getText()).to.eventually.contain(columnOne);
            await expect(lineTwo[2].getText()).to.eventually.equal(statusOne);
    
            await expect(header[4].getText()).to.eventually.equal(columnTwo);
            await expect(lineTwo[4].getText()).to.eventually.equal(statusTwo);
        }
    });

    When(/^eu indico a ordenação por prioridade$/, async () => {
        await element(by.id('atencao-cima')).click();
    });

    Then(/^eu posso visualizar a lista de informações organizadas com as mensagens marcadas com "([^\"]*)" em "([^\"]*)" primeiro$/, async (status, column) => {
        let tableData = await element(by.id("tabela-mensagens"));
        let rows = await tableData.all(by.tagName("tr"));

        let header = await rows[0].all(by.tagName("th"));
        let lineOne = await rows[1].all(by.tagName("td"));

        await expect(header.length).to.equal(6);
        await expect(lineOne.length).to.equal(6);
        
        await expect(header[2].getText()).to.eventually.contain(column);
        await expect(lineOne[2].getText()).to.eventually.equal(status);
    });

    When(/^eu marco a mensagem "([^\"]*)" na indicação de "([^\"]*)"$/, async (message, status) => {
        let tableRows = await element(by.id("tabela-mensagens")).all(by.tagName("tr"));
        
        let header = await tableRows[0].all(by.tagName("th"));
        let lineOne = await tableRows[1].all(by.tagName("td"));
        let lineTwo = await tableRows[2].all(by.tagName("td"));

        await expect(header.length).to.equal(6);
        await expect(lineOne.length).to.equal(6);
        await expect(lineTwo.length).to.equal(6);
        
        if(await lineOne[0].getText() === message) {
            // mensagem na linha 1
            if (await header[4].getText() === status) {
                // resolvido
                await expect(lineOne[0].getText()).to.eventually.contain(message);
                await expect(header[4].getText()).to.eventually.equal(status);
                await lineOne[4 + 1].all(by.tagName('input')).click();
            } else {
                // atenção
                await expect(lineOne[0].getText()).to.eventually.contain(message);
                await expect(header[2].getText()).to.eventually.contain(status);
                await lineOne[2 + 1].all(by.tagName('input')).click();
            }
        } else {
            if (await header[4].getText() === status) {
                // resolvido
                await expect(lineTwo[0].getText()).to.eventually.contain(message);
                await expect(header[4].getText()).to.eventually.equal(status);
                await lineTwo[4 + 1].all(by.tagName('input')).click();
            } else {
                // atenção
                await expect(lineTwo[0].getText()).to.eventually.contain(message);
                await expect(header[2].getText()).to.eventually.contain(status);
                await lineTwo[2 + 1].all(by.tagName('input')).click();
            }
        }
    });

    Then(/^eu posso visualizar a mensagem "([^\"]*)" com a coluna "([^\"]*)" marcada com "([^\"]*)"$/, async (message, status, res) => {
        let tableRows = await element(by.id("tabela-mensagens")).all(by.tagName("tr"));
        
        let header = await tableRows[0].all(by.tagName("th"));
        let lineOne = await tableRows[1].all(by.tagName("td"));
        let lineTwo = await tableRows[2].all(by.tagName("td"));

        await expect(header.length).to.equal(6);
        await expect(lineOne.length).to.equal(6);
        await expect(lineTwo.length).to.equal(6);
        
        if(await lineOne[0].getText() === message) {
            // mensagem na linha 1
            if (await header[4].getText() === status) {
                // resolvido
                await expect(lineOne[0].getText()).to.eventually.contain(message);
                await expect(header[4].getText()).to.eventually.equal(status);
                await expect(lineOne[4].getText()).to.eventually.equal(res);
            } else {
                // atenção
                await expect(lineOne[0].getText()).to.eventually.contain(message);
                await expect(header[2].getText()).to.eventually.contain(status);
                await expect(lineOne[2].getText()).to.eventually.equal(res);
            }
        } else {
            if (await header[4].getText() === status) {
                // resolvido
                await expect(lineTwo[0].getText()).to.eventually.contain(message);
                await expect(header[4].getText()).to.eventually.equal(status);
                await expect(lineTwo[4].getText()).to.eventually.equal(res);
            } else {
                // atenção
                await expect(lineTwo[0].getText()).to.eventually.contain(message);
                await expect(header[2].getText()).to.eventually.contain(status);
                await expect(lineTwo[2].getText()).to.eventually.equal(res);
            }
        }
    });
});