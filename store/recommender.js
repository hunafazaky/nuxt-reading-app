export const state = () => ({
  forYouData: null,
});

export const mutations = {
  setForYou(state, data) {
    state.forYouData = data;
  },
};

export const actions = {
  async getForYou({ commit }) {
    commit("setForYou", []);
    return [];
  },
  async updateRecommender({ commit }, rating) {
    return {};
  },
};

export const getters = {
  foryou(state) {
    return state.forYouData;
  },
};
