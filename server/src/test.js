// JavaScript source code
const unirest = require('unirest');
const cheerio = require('cheerio');

const configs = {
    headhunter: {
        mainUrl: 'https://hh.kz/',
        parseVacancies: '.resume-search-item__content a',
    },
    freelansim: {
        searchUrl: 'https://freelansim.ru/freelancers?q=',
        parseVacancies: '.user-data__title a',
        parseInfo: {
            name: '.user__name_large a',
            age: '.user__meta',
            position: '.user__profession'
        }
    },

}

const user = {};

const url = 'https://freelansim.ru/freelancers/krvital';

unirest.get(url)
        .end(response => {
            const body = response.body;

            const $ = cheerio.load(body);

            const age = $(configs.freelansim.parseInfo.age).text().trim();
            const name = $(configs.freelansim.parseInfo.name).text().trim();
            const position = $(configs.freelansim.parseInfo.position).text().trim();
            
            user.name = name;
            user.position = position;
            user.age = age;

            console.log(user);
    })