const axios = require('axios');
const cheerio = require('cheerio');

var str = '.b-layout__txt b-layout__txt_valign_top b-layout__txt_lineheight_15 b-layout__txt_ellipsis b-layout_inline-block b-layout__txt_width_225';

var arr = str.split(' ').join('.');


console.log(arr);

axios.get('https://www.fl.ru/users/miridea/?f=2&stamp=62342#0')
    .then(response => {
        console.log('status ', response.status);
        if (response.status == 200) {
            const $ = cheerio.load(response.data);
            console.log($(arr));
        }
    }
);
