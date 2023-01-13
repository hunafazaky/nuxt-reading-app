export const state = () => ({
  list: [
    {
      "id": 1,
      "name": "Berita",
      "color": "red",
      "created_at": "21 Desember 2012",
      "updated_at": "21 Desember 2012"
    },
    {
      "id": 2,
      "name": "Karya Ilmiah",
      "color": "blue",
      "created_at": "21 Desember 2012",
      "updated_at": "21 Desember 2012"
    },
    {
      "id": 3,
      "name": "Karya Fiksi",
      "color": "green",
      "created_at": "21 Desember 2012",
      "updated_at": "21 Desember 2012"
    },
    {
      "id": 4,
      "name": "Puisi",
      "color": "purple",
      "created_at": "21 Desember 2012",
      "updated_at": "21 Desember 2012"
    },
    {
      "id": 5,
      "name": "Resensi",
      "color": "amber",
      "created_at": "21 Desember 2012",
      "updated_at": "21 Desember 2012"
    },
  ],
})

export const mutations = {
  add(state, text) {
    state.list.push({
      text,
      done: false
    })
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  }
}