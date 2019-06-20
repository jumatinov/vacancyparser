export const fetchGitUsers = (searchText) => {
  axios.get(`https://api.github.com/search/users?q=${searchText}`, headersMacro).then(response => {
    if (response.status == 200) {
      this.iterator = 0;
      this.isLoading = true;
      this.users = response.data.items;
      this.total = response.data.total_count;
      console.log(response.data);
      for (let i = 0; i < this.users.length - 1; i++) {
        axios.get(this.users[i].url, headersMacro).then(response => {
          if (response.status == 200) {
            this.iterator++;
            this.users[this.iterator].info = response.data;

            console.log(response.data, this.iterator);
          };
          if (this.iterator == this.users.length - 1 && response.status == 200) {
            this.fetchInfo = true;
            this.isLoading = false;
            console.log('Done!', this.fetchInfo, this.isLoading);
          }
        })
      }
    }
  })
}
