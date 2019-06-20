var express = require('express');
var router = express.Router();
const parser = require('./../parse/parse');

router.get('/parse', async (request, response, next) => {
    const text = request.query.text;
    const region = request.query.region;
    const maxResume = 25;
    try {
        const users = await parser.getUsers(text, region, maxResume);
        response.send(users);
    } catch (error) {
        console.log(error);
        next(error);
    } 
})

module.exports = router;