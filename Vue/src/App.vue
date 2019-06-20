<template>
  <div id="app">
    <div class="main">
      <img :src="logoGit" class="logo_git" />
      <big class="logo_fl">Фрилансим</big>
      <h2>Parser Application</h2>
      <h3>Enter the text and click button which resource would you like to parse</h3>
      <input class="search_bar" type="text" placeholder="Search"
             v-model="search"/>
      <p class="search_error">{{ message }}</p>
      <p>
        <input type="text" class="search_bar location_git" name="name" v-model="locationGit" placeholder="Location" />
        <input type="text" class="search_bar location_git" name="name" v-model="locationFl" placeholder="Location" />
      </p>

      <input type="checkbox" v-model="withEmail">
      <label for="checkbox">With emails {{ withEmail }}</label>

      <input type="checkbox" v-model="gitComponent">
      <label for="checkbox">GitHub Parser {{ gitComponent }}</label>

      <input type="checkbox" v-model="flComponent">
      <label for="checkbox">Freelansim Parser {{ flComponent }}</label>
    </div>

    <div class="parser">
      <parser-component-git v-if="gitComponent"
                            :search="search"
                            :emailRequired="withEmail"
                            :location="locationGit"
                            @searchError="searchError"
                            @searchSuccess="searchSuccess">
      </parser-component-git>

      <parser-component-fl v-show="flComponent"
                           :search="search"
                           :location="locationFl"
                            @searchError="searchError"
                            @searchSuccess="searchSuccess">
      </parser-component-fl>
    </div>
  </div>
</template>

<script>
import imageGit from './assets/GitHublogo.png'
export default {
  data () {
    return {
      locationGit: '',
      locationFl: '',
      logoGit: imageGit,
      logoFl:'',
      withEmail: false,
      state: 'main',
      flComponent: true,
      gitComponent: true,
      search: '',
      flTotal: 0,
      usersFl: [],
      gitTotal: 0,
      usersGit: [{}],
      message: '',
    }
    },
    methods: {
      getUsers(search) {
        this.gitComponent = false;
        if (search.length > 0) {
          this.message = '';
          let searchText = searchToQuery(search);
          this.gitComponent = true;
          this.search = searchText;
         
        } else {
          this.message = 'Введите поисковой запрос'
        }
      },
      searchError() {
        this.message = 'Введите поисковой запрос'
      },
      searchSuccess() {
        this.message = ''
      }
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
</script>

<style scoped>
  .logo_git {
    float: left;
    margin: 32px;
    width: 3%;
  }
  .logo_fl {
    float: right;
    color: black;
    font-family: monospace;
    font-size: xx-large;
    margin-right: 5%;
    margin-top: 2%;
    margin-left: -9%;
  }
  .main label {
    margin-right: 3%;
    margin-bottom: 3%;
  }
  .main {
    border-radius: 25px;
    margin: 1%;
    text-align: center;
    background: linear-gradient(to right, rgb(72, 56, 56) 50%, orange 50%);
    color: white;
    padding-top: 1px;
  }
  .main h2 {
    margin-top: 3%;
  }
  hr {
    width: 100%;
  }
  .search_bar {
    color: black;
    border-radius: 5px;
    width: 500px;
    margin: 10px 0 30px;
    padding: 5px;
  }

  h3, .btn {
    margin: 30px 0;
  }
  .parser {
    max-width: 1100px;
    margin: 20px auto;
  }

  .location_git{
    width: 15%;
    margin: 15px;
  }

  .search_error{
    color:red;
    font-size: large;
  }

</style>
