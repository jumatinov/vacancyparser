var express = require('express');
var router = express.Router();
const parser = require('./../parse/parse');

router.get('/parse', async (request, response, next) => {
    const text = request.query.text;
    const page = request.query.page;
    const region = request.query.location;
    const maxResume = 25;
    try {
        const users = await parser.getUsers(text, region, maxResume, page);
        response.send(users);
    } catch (error) {
        console.log(error);
        next(error);
    } 
})

router.get('/total', async (request, response, next) => {
    const text = request.query.text;
    try {
        const total = await parser.getTotal(text);
        response.send(total);
    } catch (error) {
        console.log(error);
        next(error);
    }
})


module.exports = router;