<template>
  <div class="fl_parser">
    <button class="btn btn-primary" @click="getUsers(currentPage)">
      Get from FL
    </button>
    <button class="btn btn-primary" v-show="totalPages ? currentPage > 1 : false" @click="getUsers(currentPage-1)">
      << Previous
    </button>
    <button class="btn btn-primary" v-show="totalPages - currentPage > 0" @click="getUsers(currentPage+1)">
      Next >>
    </button>
    <img :src="image" class="logo" />
    <h2>Parser of freelansim.ru</h2>
    <hr />
    <h3>Users Amount {{ total }}</h3>
    <div v-if="fetchInfo">
      <div v-for="user in users" class="info">
        <div class="info_info" v-if="user">
          <img :src="user.ava" v-if="user.ava" class="ava" />
          <img v-else :src="userImage" class="ava" />
          <h3>Name: {{ user.name }}</h3>
          <p v-if="user.age">Age {{ user.age }}</p>
          <p>Position: {{ user.position}}</p>
          <p> About: {{ user.about }}</p>
          <p><a :href="user.url">Link in fl</a></p>
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
    <p v-if="message">
      {{ message }}
    </p>
    <div v-if="isLoading">
      Loading
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import image from './../assets/GitHublogo.png'
  import imageU from './../assets/userImage.png'
  export default {
    data() {
      return {
        userImage: imageU,
        message: '',
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
        this.isLoading = true;

        axios.get(`http://localhost:8080/api/parse?text=${searchText}`).then(response => {
          console.log(response.status);
          if (response.status == 200) {
            this.flComponent = true;
            this.users = response.data;
            this.isLoading = false;
            this.fetchInfo = true;

            console.log(this.users);
          } else {
            this.isLoading = false;
            this.message = 'Please refresh your query';
          }
        });
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

  hr {
    width: 75%;
  }

  .ava {
    border-radius: 25%;
    width: 75px;
    float: left;
    margin: 2%;
  }

  li {
    list-style-type: none;
    margin-left: 0%;
  }

  ul {
    margin-left: 0; /* Отступ слева в браузере IE и Opera */
    padding-left: 0;
  }

  .info {
    font-size: medium;
    font-weight: 500;
    margin: 5px;
    border-radius: 5px;
    text-align: left;
    color: black;
    background-color: whitesmoke;
  }

    .info h4 {
      margin-left: 20%;
    }

    .info h3 {
      margin: 2% 0 2% 20%;
    }

    .info p {
      margin-left: 20%;
    }

  .fl_parser {
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    color: rgb(254, 254, 254);
    background-color: red;
    float: left;
    width: 50%;
  }

  .btn {
    margin: 10px 5px 0px;
  }

  .logo {
    float: left;
    margin: 10px 10px 40px 10px;
    padding: 10px;
    width: 20%;
  }
</style>
