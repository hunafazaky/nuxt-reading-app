export const state = () => ({
  data: [
    {
      id: 0,
      name: "Teknologi",
    },
    {
      id: 1,
      name: "Kesehatan",
    },
    {
      id: 2,
      name: "Olahraga",
    },
    {
      id: 3,
      name: "Travel",
    },
    {
      id: 4,
      name: "Otomotif",
    },
  ],
});

export const mutations = {
  add(state, text) {
    state.list.push({
      text,
      done: false,
    });
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1);
  },
  toggle(state, todo) {
    todo.done = !todo.done;
  },
};
