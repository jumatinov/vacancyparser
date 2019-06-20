<template>
  <div class="alert alert-secondary">
    <h3>Are you ready for searching new resume?</h3>
    <input class="search_bar" type="text" placeholder="Search"
           v-model="search" aria-label="Search">
    <button class="btn brn-primary" @click="$emit('searchUsers', search)">
      Get Users
    </button>
    <p>{{ message }}</p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        search: ''
      }
    },
    props: ['message']
  }
</script>

<style scoped>
  .alert{
    text-align:center;
  }
  .search_bar{
    border-radius: 5px;
    width: 500px;
    margin: 10px;
    padding: 5px;
  }
  h3, .btn {
    margin: 30px 0;
  }
</style>
