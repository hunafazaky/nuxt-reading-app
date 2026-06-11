export const state = () => ({
  show: false,
  message: "",
  color: "error",
});

export const mutations = {
  showMessage(state, payload) {
    state.message = payload.message || "An error occurred";
    state.color = payload.color || "error";
    state.show = true;
  },
  hideMessage(state) {
    state.show = false;
  },
};
