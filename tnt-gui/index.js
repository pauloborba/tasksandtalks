const request = require('request-promisse')
const cheerio = require('cheerio')


const URL = "localhost:3000"


async function acesso(){
	const response = await request(URL)
	console.log(response)
	


}

acesso()
