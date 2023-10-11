export const state = () => ({
  counter: 0,
  worksData: null,
  usersData: null,
})

export const mutations = {
  increment(state) {
    state.counter++
  },
  decrement(state) {
    state.counter--
  },
  setWorks(state, data) {
    state.worksData = data
  },
  setUsers(state, data) {
    state.usersData = data
  },
}

export const actions = {
  async fetchCounter({ state }) {
    // make request
    const res = { data: 10 }
    state.counter = res.data
    return res.data
  },
  increment(context) {
    context.commit('increment')
  },
  decrement(context) {
    context.commit('decrement')
  },
  fetchWorksFromApi({ commit }) {
    // Lakukan panggilan API di sini, misalnya dengan axios
    this.$axios.get('/works')
      .then(response => {
        commit('setWorks', response.data)
      })
      .catch(error => {
        console.error('Error fetching data from API:', error)
      })
  },
  fetchUsersFromApi({ commit }) {
    // Lakukan panggilan API di sini, misalnya dengan axios
    this.$axios.get('/users')
      .then(response => {
        commit('setUsers', response.data)
      })
      .catch(error => {
        console.error('Error fetching data from API:', error)
      })
  },
}

export const getters = {
  getCounter(state) {
    return state.counter
  },
  works(state) {
    return state.worksData
  },
  users(state) {
    return state.usersData
  }
}