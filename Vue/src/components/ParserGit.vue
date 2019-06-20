<template>
  <div class="git_parser">
    <button class="btn btn-primary" @click="getUsers(currentPage)">
      Get from Git
    </button>
    <button class="btn btn-primary" v-show="totalPages ? currentPage > 1 : false" @click="getUsers(currentPage-1)">
      << Previous
    </button>
    <button class="btn btn-primary" v-show="totalPages - currentPage > 0" @click="getUsers(currentPage+1)">
      Next >>
    </button>
    <img :src="image" class="logo" />
    <h2>Parser of Git</h2>
    <h3>Users Amount {{ total }}</h3>
    <div v-if="fetchInfo">
      <div v-for="(user,index) in users" class="info" :ref="'user'+index">
        <div class="info_info" v-if="emailRequired ? user.email : user.info">
          <img :src="user.avatar_url" class="ava" />
          <h3>Name: {{ user.info.name }}</h3>
          <p>login: {{ user.login }}</p>
          <p>Url: <a :href="user.html_url">{{ user.html_url }}</a></p>
          <p>Score: {{ user.score }} <small v-if="user.info.email" class="with_email"> With An Email</small>  </p>
          <button class="btn btn-success" @click="addShowMore(index)">Show More</button>
          <button class="btn btn-secondary ismore" @click="addShowMore(index)">Hide</button>
          <div class="ismore">
            <p v-if="user.info.bio">Bio: {{ user.info.bio }}</p>
            <p v-if="user.info.blog">Bio: {{ user.info.blog }}</p>
            <p v-if="user.info.company">Company: {{ user.info.company }}</p>
            <p v-if="user.info.location">Location: {{ user.info.location }}</p>
            <p>Followers: {{ user.info.followers }} Following: {{ user.info.following }} </p>
            <h4 v-if="user.info.email">Email: {{ user.info.email }} </h4>
            <p>link -> <a href="user.html_url">@{{ user.login }}</a></p>
          </div>
          <button class="btn btn-success ismore">
            Full Info
          </button>
        </div>
      </div>
    </div>
    <p v-if="isLoading" class="message">
      Loading
    </p>
    <p class="message">
      {{message}}
    </p>
  </div>
</template>
<script>
  import axios from 'axios'
  import image from './../assets/GitHublogo.png'
  import { searchToQuery } from './../../../server/src/parse/parse'
  export default {
    data() {
      return {
        showMore: [],
        currentPage: 1,
        image: image,
        users: [],
        total: 0,
        iterator: 0,
        isLoading: false,
        fetchInfo: false,
        message: '',
        headersMacro: {
          headers: {
            "Authorization": "token " + '72d116fb4955acf711938f17b53261127bdd786b'
          }
        }
      }
    },
    computed: {
      totalPages() {
        return Math.ceil(this.total / 30)
      }
    },
    methods: {
      getUsers(page) {
        const headersMacro = this.headersMacro;
        this.currentPage = page;
        const searchText = searchToQuery(this.search);
        const location = this.location ? `location:${this.location}` : '';
        this.message = '';
        if (searchText.length < 1) {
          this.$emit('searchError');
        } else {
          this.$emit('searchSuccess');
          axios.get(`https://api.github.com/search/users?q=${searchText}+${location}&page=${page}`, headersMacro)
            .then(response => {
              if (response.status == 200) {
                
                this.users = response.data.items;
                this.total = response.data.total_count;
                if (!this.total) {
                  this.message = 'Nothing found';
                  this.isLoading = false;
                } else {
                  this.isLoading = true;
                }
                console.log(response.data);

                for (let i = 0; i < this.users.length; i++) {
                  axios.get(this.users[i].url, headersMacro).then(response => {

                    if (response.status == 200) {
                      this.users[i].info = response.data;
                      this.users[i].email = this.users[i].info.email;
                      console.log(response.data, i);
                    }
                    if (i == this.users.length - 1 && response.status == 200) {
                      this.fetchInfo = true;
                      this.isLoading = false;
                    }
                  })
                }
              }
            })
        }
      },
      addShowMore(index) {
        console.log(this.$refs['user' + index]);
        console.log(this.$refs);
        this.$refs['user' + index][0].classList.toggle('active');
      },
      searchToQuery(search) {
        const array = search.split(' ');
        var query = '';
        for (let i = 0; i < array.length - 1; i++) {
          query = query + array[i] + '+';
        }
        return query + array[array.length - 1];
      }
    },
    props: ['search', 'emailRequired', 'location']
  }

</script>
<style scoped>
  .with_email {
    color: green;
  }

  .ava {
    border-radius: 25%;
    width: 75px;
    float: left;
    margin: 2%;
  }

  .info {
    word-wrap: break-word;
    font-size: medium;
    font-weight: 500;
    margin: 5px;
    border-radius: 5px;
    text-align: left;
    color: black;
    background-color: rgb(247, 208, 208);
  }
  .info h4 {
    margin-left: 20%;
  }
  .info h3 {
    margin: 2% 0 2% 20%;
  }
  .info p{
    margin-left: 20%;
  }
  .git_parser {
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    color: rgb(254, 254, 254);
    background-color: rgb(72, 56, 56);
    float: left;
    width: 50%;
  }
  .btn {
    margin: 1%;
  }
  .logo{
    float: left;
    margin: 10px 10px 30px 10px;
    padding:10px;
    width: 20%;
  }
  .ismore{
    display:none;
  }
  .info.active .ismore{
    display:block;
  }
  .message{
    margin: 3%;
  }
</style>
