import Vue from 'vue'
import App from './App.vue'

import ParserComponentFl from './components/ParserFl'
import ParserComponentGit from './components/ParserGit'

//Import of components
Vue.component('ParserComponentFl', ParserComponentFl);
Vue.component('ParserComponentGit', ParserComponentGit);

new Vue({
  el: '#app',
  render: h => h(App)
})
