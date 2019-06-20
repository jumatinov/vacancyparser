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
    <hr />
    <h3>Users Amount {{ total }}</h3>
    <div v-if="fetchInfo">
      <div v-for="user in users" class="info">
        <div class="info_info" v-if="user.info">
          <img :src="user.avatar_url" class="ava" />
          <h3>Name: {{ user.info.name }}</h3>
          <p>login: {{ user.login }}</p>
          <p>Url: <a :href="user.html_url">{{ user.html_url }}</a></p>
          <p>Score: {{ user.score }} <small v-if="user.info.email" class="with_email"> With An Email</small>  </p>
          <button class="btn btn-success" v-if="!showMore.includes(user.login)" @click="addShowMore(user.login, true)">Show More</button>
          <button class="btn btn-secondary" v-else-if="showMore.includes(user.login)" @click="addShowMore(user.login, false)">Hide</button>
          <div v-if="showMore.includes(user.login)">
            <p v-if="user.info.bio">Bio: {{ user.info.bio }}</p>
            <p v-if="user.info.blog">Bio: {{ user.info.blog }}</p>
            <p v-if="user.info.company">Company: {{ user.info.company }}</p>
            <p v-if="user.info.location">Location: {{ user.info.location }}</p>
            <p>Followers: {{ user.info.followers }} Following: {{ user.info.following }} </p>
            <h4>Email: {{ user.info.email }} </h4>
            <p>link -> <a href="user.html_url">@{{ user.login }}</a></p>
          </div>
          <button v-if="showMore.includes(user.login)" class="btn btn-success">
            Full Info
          </button>
        </div>
      </div>
    </div>
    <div v-if="isLoading">
      Loading
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import image from './../assets/GitHublogo.png'
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
        fetchInfo: false
      }
    },
    computed: {
      totalPages() {
        return Math.ceil(this.total / 30)
      }
    },
    methods: {
      getUsers(page) {
        this.currentPage = page;
        const searchText = this.search;
        axios.get(`https://api.github.com/search/users?q=${searchText}&page=${page}`, headersMacro).then(response => {
          if (response.status == 200) {
            this.iterator = 0;
            this.isLoading = true;
            this.users = response.data.items;
            this.total = response.data.total_count;
            console.log(response.data);
            for (let i = 0; i < this.users.length - 1; i++) {
              axios.get(this.users[i].url, headersMacro).then(response => {
                if (response.status == 200) {
                  this.users[this.iterator].info = response.data;
                  console.log(response.data, this.iterator);
                  this.iterator++;
                }
                if (this.iterator == this.users.length - 1 && response.status == 200) {
                  this.fetchInfo = true;
                  this.isLoading = false;
                }
              })
            }
          }
        })
      },
      addShowMore(login, isShow) {
        if (isShow) {
          this.showMore.push(login);
        }
        else {
          for (let i = 0; i < this.showMore.length; i++) {
            if (this.showMore[i] === login) {
              this.showMore.splice(i);
            }
          }
        }
      },
      createdAt(created) {
        return created
      }
    },
    mounted() {
    },
    props: ['search']
  }

  const headersMacro = {
    headers: {
      "Authorization": "token " + '6415cb97bde8524cbb03d796e65c2f311d4d6069'
    }
  }
</script>
<style scoped>
  .with_email {
    color: green;
  }

  .info_info .btn {
    margin-bottom: 1%;
  }
  hr{
    width: 75%;
  }
  .ava {
    border-radius: 25%;
    width: 75px;
    float: left;
    margin: 2%;
  }
  li {
    list-style-type:none;
    margin-left: 0%;
  }
  ul {
    margin-left: 0; /* Отступ слева в браузере IE и Opera */
    padding-left: 0;
  }
  .info {
    font-size: medium;
    font-weight:500;
    margin: 5px;
    border-radius: 5px;
    text-align: left;
    color: black;
    background-color:rgb(247, 208, 208);
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
    margin: 10px 5px 0px;
  }
  .logo{
    float: left;
    margin: 10px 10px 40px 10px;
    padding:10px;
    width: 20%;
  }
</style>
