export default function ({ $axios, store }) {
  // Restore token from localStorage on init
  const token = localStorage.getItem("auth_token");
  if (token) {
    $axios.setToken(token, "Bearer");
  }

  // Intercept requests (optional if setToken works, but good for safety)
  $axios.onRequest((config) => {
    const currentToken = localStorage.getItem("auth_token");
    if (currentToken) {
      config.headers.common["Authorization"] = `Bearer ${currentToken}`;
    }
  });

  // Global Error Handler
  $axios.onError((error) => {
    let message = "An unexpected error occurred";
    if (error.response && error.response.data && error.response.data.message) {
      message = error.response.data.message;
    } else if (error.message) {
      message = error.message;
    }

    store.commit("snackbar/showMessage", {
      message: message,
      color: "error",
    });
  });
}
