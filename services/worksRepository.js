export default ($axios) => ({
  getWorks({ page = 1, limit = 12, category = "" } = {}) {
    const params = { sortBy: "newest", page, limit };
    if (category) params.category = category;
    return $axios.get("/works", { params });
  },
  getWorkById(id) {
    return $axios.get("/works/" + id);
  },
  updateReaders(workId) {
    return $axios.post(`/works/${workId}/read`);
  },
  updateLikeBy(workId) {
    return $axios.post(`/works/${workId}/bookmark`);
  },
  updateRateBy(workId, rating) {
    return $axios.post(`/works/${workId}/rate`, { rating });
  },
  removeLikeBy(workId) {
    return $axios.delete(`/works/${workId}/bookmark`);
  },
  postWork(data) {
    return $axios.post("/works", data);
  },
  deleteWork(id) {
    return $axios.delete("/works/" + id);
  },
});
