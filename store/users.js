export const state = () => ({
  usersData: null,
  userData: null,
  newReadList: null,
});

export const mutations = {
  setUsers(state, data) {
    state.usersData = data;
  },
  setUser(state, data) {
    state.userData = data;
  },
  updateReadList(state, data) {
    const newData = state.userData.read_list.filter(
      (item) => item._id !== data
    );
    newData.unshift(data);
    state.newReadList = newData;
  },
  updateLikeList(state, data) {
    const newData = state.userData.like_list.filter(
      (item) => item._id !== data
    );
    newData.unshift(data);
    state.userData.like_list = newData;
  },
  updateRateList(state, data) {
    const newData = state.userData.rate_list.filter(
      (item) => item.work_id !== data.workId
    );
    newData.unshift({ work_id: data.workId, rating: data.rating });
    state.userData.rate_list = newData;
  },
  removeLikeList(state, data) {
    const newData = state.userData.like_list.filter(
      (item) => item._id !== data
    );
    state.userData.like_list = newData;
  },
};

export const actions = {
  async getUsers({ commit }) {
    const response = await this.$repositories.usersRepository.getUsers();
    commit("setUsers", response.data);
    return response.data;
  },
  async getUserById({ commit }, id) {
    const response = await this.$repositories.usersRepository.getUserById(id);
    commit("setUser", response.data);
    return response.data;
  },
  async getUser({ commit }, id) {
    const response = await this.$repositories.usersRepository.getUserById(id);
    return response.data;
  },
  async updateReadList({ commit }, workId) {
    commit("updateReadList", workId);
  },
  async updateLikeList({ commit }, workId) {
    commit("updateLikeList", workId);
  },
  async updateRateList({ commit, rootState }, rating) {
    const workId = rootState.works?.workData?.id || rootState.workData?.id;
    commit("updateRateList", { rating, workId });
  },
  async removeLikeList({ commit }, workId) {
    commit("removeLikeList", workId);
  },
  async signup({ commit }, data) {
    const response = await this.$repositories.usersRepository.signup(data);
    if (response.data.token) {
      localStorage.setItem("auth_token", response.data.token);
      if (response.data.user && (response.data.user.id || response.data.user._id)) {
        localStorage.setItem("auth_user_id", response.data.user.id || response.data.user._id);
      }
      this.$axios.setToken(response.data.token, "Bearer");
    }
    return response.data;
  },
  async signin({ commit }, data) {
    const response = await this.$repositories.usersRepository.signin(data);
    commit("setUser", response.data.user);
    if (response.data.token) {
      localStorage.setItem("auth_token", response.data.token);
      if (response.data.user && (response.data.user.id || response.data.user._id)) {
        localStorage.setItem("auth_user_id", response.data.user.id || response.data.user._id);
      }
      this.$axios.setToken(response.data.token, "Bearer");
    }
    return response.data;
  },
};

export const getters = {
  users(state) {
    return state.usersData;
  },
  me(state) {
    return state.userData;
  },
};
