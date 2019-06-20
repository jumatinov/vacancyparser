// Class Names
const configs = {
    headhunter: {
        mainUrl: 'https://hh.kz/',
        parseVacancies: '.resume-search-item__content a',
    },
    freelansim: {
        mainUrl: 'https://freelansim.ru',
        searchUrl: 'https://freelansim.ru/freelancers?q=',
        parseVacancies: '.user-data__title a',
        pages: '.pagination a',
        parseInfo: {
            name: '.user__name_large a',
            age: '.user__meta',
            position: '.user__profession',
            ava: '.avatario',
            about: '.user-data__about',
            mainInfo: '.user-params.user-params_inline'
        }
    },
    fl: {
        mainUrl: 'https://www.fl.ru/',
        searchUrl: 'https://www.fl.ru/freelancers/?action=search&show=all&search_string=',
        parseVacancies: '.freelancer-name.freelancer-catalog',
        parseInfo: {
            name: '.b-layout__txt.b-layout__txt_fontsize_15.b-layout__txt_bold.b-layout__txt_padbot_10.b-layout__txt_lineheight_1.b-page__ipad b-page__iphone',
            age: '.b-layout__txt.b-layout__txt_fontsize_11.b-layout__txt_padbot_10',
            position: '.prtfl p'
        }
    }
}

module.exports = configs;