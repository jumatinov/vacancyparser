const cheerio = require('cheerio');
const axios = require('axios');
const configs = require('./../configs/configs');

async function getTotal(text) {
    const searchFreelansim = configs.freelansim.searchUrl + searchToQuery(text);
    try {
        const result = await axios.get(searchFreelansim)
            .then(response => {
                if (response.status == 200) {
                    var res = {};
                    const html = response.data;
                    const $ = cheerio.load(html); 
                    var total = $('.page-title').text();

                    res.total = total.slice(11, total.length).split(')')[0].split('(')[1];

                    return res;
                }
            })
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function getUrls(url, classConfig, maxLength) {
    try {
        const result = await axios.get(url)
            .then(response => {
                if (response.status === 200) {
                    var urlsOfVacancies = [];

                    const html = response.data;

                    const $ = cheerio.load(html); //Сохраняется body Для парсинга в cheerio
                    
                    const hrefs = $(classConfig.parseVacancies);

                    for (let i = 0; i < maxLength; i++) {
                        urlsOfVacancies.push(hrefs[i].attribs.href);
                    };

                    return urlsOfVacancies;
                }
            });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function getUser(url, classConfig) {
    
    try {
        const result = await axios.get(url, {timeout: 5 * 1000})
            .then(response => {
                if (response.status === 200) {
                    var user = {};

                    const html = response.data;

                    const $ = cheerio.load(html);
                    
                    const login = url.split('/')[4];

                    const age = $(classConfig.age).text().trim();
                    const name = $(classConfig.name).text().trim();
                    const position = $(classConfig.position).text().trim();
                    const ava = $(classConfig.ava)[0].attribs.src;
                    const about = $(classConfig.about).text().trim();
                    const mainInfo = $(classConfig.mainInfo).text().trim();

                    user.url = url;
                    user.mainInfo = mainInfo;
                    user.about = about;
                    user.name = name;
                    user.position = position;
                    user.age = age;
                    user.ava = ava;
                    user.login = login;

                    return user;
                }
            });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function getUsers(text, region, maxUsers, page) {
    const searchFreelansim = configs.freelansim.searchUrl + searchToQuery(text) + '&page=' + page; 
    const mainFreelansim = configs.freelansim.mainUrl;
    const configsFreelansim = configs.freelansim;
    const pagesConfigs = configs.pages; 
    
    try {
        const hrefs = await getUrls(searchFreelansim, configsFreelansim, maxUsers);

        const usersArray = await hrefs.map(async (href) => {             //map cant be broke have to use other method 'some' 
            const user = await getUser(mainFreelansim + href, configsFreelansim.parseInfo);
            return user;
        });
        
        const users = await Promise.all(usersArray);

        return users;
    } catch (error) {
        console.log(error);
    }
}

function searchToQuery(search) {
    const array = search.split(' ');
    var query = '';
    for (let i = 0; i < array.length - 1; i++) {
        query = query + array[i] + '+';
    }
    return query + array[array.length - 1];
}

const parser = {
    getUser: getUser,
    getUrls: getUrls,
    getUsers: getUsers,
    getTotal: getTotal
};

module.exports = parser;