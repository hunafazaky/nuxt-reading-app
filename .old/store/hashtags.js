export const state = () => ({
  list: [
    {
      "id": 1,
      "name": "Teknologi",
      "created_at": "21 Desember 2012",
      "updated_at": "21 Desember 2012"
    },
    {
      "id": 2,
      "name": "Sastra",
      "created_at": "21 Desember 2012",
      "updated_at": "21 Desember 2012"
    },
    {
      "id": 3,
      "name": "Budaya",
      "created_at": "21 Desember 2012",
      "updated_at": "21 Desember 2012"
    },
    {
      "id": 4,
      "name": "Fisika",
      "created_at": "21 Desember 2012",
      "updated_at": "21 Desember 2012"
    },
    {
      "id": 5,
      "name": "Kimia",
      "created_at": "21 Desember 2012",
      "updated_at": "21 Desember 2012"
    },
    {
      "id": 6,
      "name": "Biologi",
      "created_at": "21 Desember 2012",
      "updated_at": "21 Desember 2012"
    },
    {
      "id": 7,
      "name": "Pariwisata",
      "created_at": "21 Desember 2012",
      "updated_at": "21 Desember 2012"
    },
    {
      "id": 8,
      "name": "Romansa",
      "created_at": "21 Desember 2012",
      "updated_at": "21 Desember 2012"
    },
    {
      "id": 9,
      "name": "Komedi",
      "created_at": "21 Desember 2012",
      "updated_at": "21 Desember 2012"
    },
    {
      "id": 10,
      "name": "Drama",
      "created_at": "21 Desember 2012",
      "updated_at": "21 Desember 2012"
    },
    {
      "id": 11,
      "name": "Kisah Nyata",
      "created_at": "21 Desember 2012",
      "updated_at": "21 Desember 2012"
    },
    {
      "id": 12,
      "name": "Sejarah",
      "created_at": "21 Desember 2012",
      "updated_at": "21 Desember 2012"
    },
    {
      "id": 13,
      "name": "Serial",
      "created_at": "21 Desember 2012",
      "updated_at": "21 Desember 2012"
    },
    {
      "id": 14,
      "name": "Parodi",
      "created_at": "21 Desember 2012",
      "updated_at": "21 Desember 2012"
    },
    {
      "id": 15,
      "name": "Horor",
      "created_at": "21 Desember 2012",
      "updated_at": "21 Desember 2012"
    },
  ]
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