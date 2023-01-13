export const state = () => ({
  list: [
    {
      "id": 1,
      "name": "Jakarta",
      "created_at": "21 Desember 2012",
      "updated_at": "21 Desember 2012"
    },
    {
      "id": 2,
      "name": "Bandung",
      "created_at": "21 Desember 2012",
      "updated_at": "21 Desember 2012"
    },
    {
      "id": 3,
      "name": "Surabaya",
      "created_at": "21 Desember 2012",
      "updated_at": "21 Desember 2012"
    },
    {
      "id": 4,
      "name": "Makasar",
      "created_at": "21 Desember 2012",
      "updated_at": "21 Desember 2012"
    },
    {
      "id": 5,
      "name": "Cilegon",
      "created_at": "21 Desember 2012",
      "updated_at": "21 Desember 2012"
    },
    {
      "id": 6,
      "name": "Serang",
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