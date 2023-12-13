export const state = () => ({
  forYouData: null,
  worksData: null,
  usersData: null,
  workData: null,
  userData: null,
  workReaders: null,
  workLikeBy: null,
  workRateBy: null
})

export const mutations = {
  setForYou (state, data) {
    state.forYouData = data
  },
  setWorks (state, data) {
    state.worksData = data
  },
  setWork (state, data) {
    state.workData = data
  },
  setUsers (state, data) {
    state.usersData = data
  },
  setUser (state, data) {
    state.userData = data
  },
  updateReaders (state, data) {
    const newData = data.readers.filter(item => item._id !== state.userData.id)
    newData.unshift(state.userData.id)
    state.workReaders = newData
  },
  updateReadList (state, data) {
    const newData = state.userData.read_list.filter(item => item._id !== data)
    newData.unshift(data)
    state.userData.read_list = newData
  },
  updateLikeBy (state, data) {
    const newData = data.like_by.filter(item => item._id !== state.userData.id)
    newData.unshift(state.userData.id)
    state.workLikeBy = newData
  },
  removeLikeBy (state, data) {
    const newData = data.like_by.filter(item => item._id !== state.userData.id)
    state.workLikeBy = newData
  },
  updateLikeList (state, data) {
    const newData = state.userData.like_list.filter(item => item._id !== data)
    newData.unshift(data)
    state.userData.like_list = newData
  },
  removeLikeList (state, data) {
    const newData = state.userData.like_list.filter(item => item._id !== data)
    state.userData.like_list = newData
  },
  updateRateBy (state, rating) {
    const newData = state.workData.rate_by.filter(item => item.user_id !== state.userData.id)
    newData.unshift({ user_id: state.userData.id, rating })
    state.workData.rate_by = newData
  },
  updateRateList (state, rating) {
    const newData = state.userData.rate_list.filter(item => item.work_id !== state.workData.id)
    newData.unshift({ work_id: state.workData.id, rating })
    state.userData.rate_list = newData
  }
}

export const actions = {
  getForYou ({ state, commit }) {
    this.$axios.get('/user_recommenders/' + state.userData.id)
      .then(response => {
        commit('setForYou', response.data)
      })
      .catch(error => {
        console.error('Error fetching data from API:', error)
      })
  },
  getWorks ({ commit }) {
    this.$axios.get('/works?sortBy=newest')
      .then(response => {
        commit('setWorks', response.data)
      })
      .catch(error => {
        console.error('Error fetching data from API:', error)
      })
  },
  getWorkById ({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios.get('/works/' + id)
        .then(response => {
          commit('setWork', response.data)
          resolve(response.data)
        })
        .catch(error => {
          console.error('Error fetching data from API:', error)
          reject(error)
        })
    })
  },
  getUsers ({ commit }) {
    this.$axios.get('/users')
      .then(response => {
        commit('setUsers', response.data)
      })
      .catch(error => {
        console.error('Error fetching data from API:', error)
      })
  },
  getUserById ({ commit }, id) {
    this.$axios.get('/users/' + id)
      .then(response => {
        commit('setUser', response.data)
      })
      .catch(error => {
        console.error('Error fetching data from API:', error)
      })
  },
  getUser ({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios.get('/users/' + id)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.error('Error fetching data from API:', error)
          reject(error)
        })
    })
  },
  updateReaders ({ state, commit }, work) {
    return new Promise((resolve, reject) => {
      commit('updateReaders', work)
      this.$axios.put(`/works/${work.id}`, { readers: state.workReaders })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.error(error)
          reject(error)
        })
    })
  },
  updateReadList ({ state, commit }, workId) {
    return new Promise((resolve, reject) => {
      commit('updateReadList', workId)
      this.$axios.put(`/users/${state.userData.id}`, state.userData)
        .then(response => {
          commit('setUser', response.data)
          resolve(response.data)
        })
        .catch(error => {
          console.error(error)
          reject(error)
        })
    })
  },
  updateLikeBy ({ state, commit }, work) {
    return new Promise((resolve, reject) => {
      commit('updateLikeBy', work)
      this.$axios.put(`/works/${work.id}`, { like_by: state.workLikeBy })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.error(error)
          reject(error)
        })
    })
  },
  removeLikeBy ({ state, commit }, work) {
    return new Promise((resolve, reject) => {
      commit('removeLikeBy', work)
      this.$axios.put(`/works/${work.id}`, { like_by: state.workLikeBy })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.error(error)
          reject(error)
        })
    })
  },
  updateLikeList ({ state, commit }, workId) {
    return new Promise((resolve, reject) => {
      commit('updateLikeList', workId)
      this.$axios.put(`/users/${state.userData.id}`, { like_list: state.userData.like_list })
        .then(response => {
          commit('setUser', response.data)
          resolve(response.data)
        })
        .catch(error => {
          console.error(error)
          reject(error)
        })
    })
  },
  removeLikeList ({ state, commit }, workId) {
    return new Promise((resolve, reject) => {
      commit('removeLikeList', workId)
      this.$axios.put(`/users/${state.userData.id}`, { like_list: state.userData.like_list })
        .then(response => {
          commit('setUser', response.data)
          resolve(response.data)
        })
        .catch(error => {
          console.error(error)
          reject(error)
        })
    })
  },
  updateRateBy ({ state, commit }, rating) {
    return new Promise((resolve, reject) => {
      commit('updateRateBy', rating)
      this.$axios.put(`/works/${state.workData.id}`, { rate_by: state.workData.rate_by })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.error(error)
          reject(error)
        })
    })
  },
  updateRateList ({ state, commit }, rating) {
    return new Promise((resolve, reject) => {
      commit('updateRateList', rating)
      this.$axios.put(`/users/${state.userData.id}`, { rate_list: state.userData.rate_list })
        .then(response => {
          commit('setUser', response.data)
          resolve(response.data)
        })
        .catch(error => {
          console.error(error)
          reject(error)
        })
    })
  },
  updateRecommender ({ state, commit }, rating) {
    return new Promise((resolve, reject) => {
      // commit('updateRecommender', rating)
      this.$axios.put(`/user_recommenders`,  { work_id: state.workData.id, user_id: state.userData.id, rating })
        .then(response => {
          // commit('setUser', response.data)
          resolve(response.data)
        })
        .catch(error => {
          console.error(error)
          reject(error)
        })
    })
  },
  regis ({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/users', { username: data.username, pen_name: data.username, password: data.password })
        .then(response => {
          console.log(response.data)
          resolve(response.data)
        })
        .catch(error => {
          console.error(error)
          reject(error)
        })
    })
  },
  login ({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/users/login', { username: data.username, password: data.password })
        .then(response => {
          commit('setUser', response.data)
          resolve(response.data)
        })
        .catch(error => {
          console.error(error)
          reject(error)
        })
    })
  },
  postWork ({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/works', data)
        .then(response => {
          console.log(response.data)
          resolve(response.data)
        })
        .catch(error => {
          console.error(error)
          reject(error)
        })
    })
  },
  deleteWork ({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios.delete('/works/' + id)
        .then(response => {
          console.log(response.data)
          resolve(response.data)
        })
        .catch(error => {
          console.error(error)
          reject(error)
        })
    })
  }
}

export const getters = {
  works (state) {
    return state.worksData
  },
  foryou (state) {
    return state.forYouData
  },
  work (state) {
    return state.workData
  },
  users (state) {
    return state.usersData
  },
  me (state) {
    return state.userData
  }
}
