export const state = () => ({
  data: [
    {
      id: 1,
      account: {
        username: 'hunafazaky',
        password: '12345678',
      },
      profile: {
        image_profile: '/temp-profile.webp',
        name: "Zaky Syi'ar Hunafa Nugroho",
        birthdate: '13 September 2000',
        place: 'Bandung',
        bio: 'Mahasiswa UIN Sunan Gunung Djati Bandung',
      },
      activities: {
        posts: [1, 3, 4, 5, 6],
        favorite_post: [1, 2, 3, 4],
        readings: [1, 3, 4, 5, 6],
        writer_subs: [2, 3],
        reader_subs: [2, 3],
        bookshelf: [1, 2, 3, 4],
      },
      created_at: '19 April 2022',
      updated_at: '19 April 2022',
    },
  ],
})

export const mutations = {
  add(state, user) {
    state.data.push({
      user,
    })
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  },
}
