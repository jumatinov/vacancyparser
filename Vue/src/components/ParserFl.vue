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
    <h2>Parser of <big class="logo_fl">Фрилансим</big></h2>
    <h3>Users Amount {{ total }}</h3>
    <div v-if="fetchInfo">
      <div v-for="user in users" class="info">
        <div class="info_info" v-if="user">
          <img :src="user.ava" v-if="user.ava[0]=='h'" class="ava" />
          <img v-else :src="userImage" class="ava" />
          <h3>Name: {{ user.name }}</h3>
          <p v-if="user.age">Age {{ user.age }}</p>
          <p>Position: {{ user.position}}</p>
          <p> About: {{ user.mainInfo }}</p>
          <p><a :href="user.url">Link in fl</a></p>
          <button class="btn btn-success" v-if="!showMore.includes(user.login)" @click="addShowMore(user.login, true)">Show More</button>
          <button class="btn btn-secondary" v-else-if="showMore.includes(user.login)" @click="addShowMore(user.login, false)">Hide</button>
          <div v-if="showMore.includes(user.login)">
            <p v-if="user.about">Bio: {{ user.about }}</p>
            <p>link on his account -> <a href="user.url">@{{ user.login }}</a></p>
          </div>
          <button v-if="showMore.includes(user.login)" class="btn btn-success">
            Full Info
          </button>
        </div>
      </div>
    </div>
    <p v-if="isLoading">
      Loading
    </p>
    <p class="message">
      {{ message }}
    </p>
  </div>
</template>
<script>
  import axios from 'axios'
  import image from './../assets/logoFl.png'
  import imageU from './../assets/userImage.png'
  import { searchToQuery } from './../../../server/src/parse/parse'
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
        const searchText = searchToQuery(this.search);
        this.fetchInfo = false;
        if (searchText.length < 1) {
          this.$emit('searchError');
        } else {
          this.$emit('searchSuccess');
          this.isLoading = true;
          axios.get(`http://localhost:8080/api/total?text=${searchText}`)
            .then(response => {
              if (response.status == 200) {
                this.total = parseInt(response.data.total);
                axios.get(`http://localhost:8080/api/parse?text=${searchText}&page=${page}`)
                  .then(response => {
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
              }
            })
          
        }
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
      }
    },
    mounted() {
    },
    props: ['search', 'location']
  }


</script>
<style scoped>
  .logo_fl {
    color: black;
    font-family: monospace;
    font-size: xx-large;
  }
  
  .info_info .btn {
    margin-bottom: 1%;
  }

  .ava {
    border-radius: 25%;
    width: 75px;
    float: left;
    margin: 2%;
  }

  .info {
    font-size: medium;
    font-weight: 500;
    margin: 5px;
    border-radius: 5px;
    text-align: left;
    color: black;
    background-color: whitesmoke;
    word-wrap: break-word;
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
    background-color: orange;
    float: right;
    width: 50%;
  }

  .btn {
    margin: 10px 5px 0px;
  }

  .logo {
    border-radius: 25px;
    float: left;
    margin: 10px 10px 30px 10px;
    padding: 10px;
    width: 20%;
  }
  .message {
    margin: 3%;
  }
</style>
