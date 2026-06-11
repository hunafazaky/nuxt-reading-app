export const state = () => ({
  worksData: null,
  workData: null,
  workReaders: null,
  workLikeBy: null,
  workRateBy: null,
});

export const mutations = {
  setWorks(state, data) {
    state.worksData = data;
  },
  setWork(state, data) {
    state.workData = data;
  },
  updateReaders(state, data) {
    const userId = data.userId;
    const newData = data.work.readers.filter((item) => item._id !== userId);
    newData.unshift(userId);
    state.workReaders = newData;
  },
  updateLikeBy(state, data) {
    const userId = data.userId;
    const newData = data.work.like_by.filter((item) => item._id !== userId);
    newData.unshift(userId);
    state.workLikeBy = newData;
  },
  updateRateBy(state, data) {
    const userId = data.userId;
    const newData = state.workData.rate_by.filter(
      (item) => item.user_id !== userId
    );
    newData.unshift({ user_id: userId, rating: data.rating });
    state.workData.rate_by = newData;
  },
  removeLikeBy(state, data) {
    const userId = data.userId;
    const newData = data.work.like_by.filter((item) => item._id !== userId);
    state.workLikeBy = newData;
  },
};

export const actions = {
  async getWorks({ commit }, { page = 1, limit = 12, category = "" } = {}) {
    const response = await this.$repositories.worksRepository.getWorks({
      page,
      limit,
      category,
    });
    commit("setWorks", response.data.works);
    return response.data;
  },
  async getWorkById({ commit }, id) {
    const response = await this.$repositories.worksRepository.getWorkById(id);
    commit("setWork", response.data);
    return response.data;
  },
  async updateReaders({ commit, rootState }, work) {
    const userId = rootState.users?.userData?.id || rootState.userData?.id;
    commit("updateReaders", { work, userId });
    const response = await this.$repositories.worksRepository.updateReaders(
      work.id
    );
    return response.data;
  },
  async updateLikeBy({ commit, rootState }, work) {
    const userId = rootState.users?.userData?.id || rootState.userData?.id;
    commit("updateLikeBy", { work, userId });
    const response = await this.$repositories.worksRepository.updateLikeBy(
      work.id
    );
    return response.data;
  },
  async updateRateBy({ state, commit, rootState }, rating) {
    const userId = rootState.users?.userData?.id || rootState.userData?.id;
    commit("updateRateBy", { rating, userId });
    const response = await this.$repositories.worksRepository.updateRateBy(
      state.workData.id,
      rating
    );
    return response.data;
  },
  async removeLikeBy({ commit, rootState }, work) {
    const userId = rootState.users?.userData?.id || rootState.userData?.id;
    commit("removeLikeBy", { work, userId });
    const response = await this.$repositories.worksRepository.removeLikeBy(
      work.id
    );
    return response.data;
  },
  async postWork({ commit }, data) {
    const response = await this.$repositories.worksRepository.postWork(data);
    return response.data;
  },
  async deleteWork({ commit }, id) {
    const response = await this.$repositories.worksRepository.deleteWork(id);
    return response.data;
  },
};

export const getters = {
  works(state) {
    return state.worksData;
  },
  work(state) {
    return state.workData;
  },
};
