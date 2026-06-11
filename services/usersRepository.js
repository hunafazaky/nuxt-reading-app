export default ($axios) => ({
  getUsers() {
    return $axios.get("/users");
  },
  getUserById(id) {
    return $axios.get("/users/" + id);
  },
  signup(data) {
    return $axios.post("/users", {
      username: data.username,
      pen_name: data.username,
      password: data.password,
    });
  },
  signin(data) {
    return $axios.post("/users/login", {
      username: data.username,
      password: data.password,
    });
  },
});
