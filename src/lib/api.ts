import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

api.interceptors.request.use((config) => {
  if (config.data && typeof config.data === "object") {
    config.data = snakecaseKeys(config.data, { deep: true });
  }

  if (config.params && typeof config.params === "object") {
    config.params = snakecaseKeys(config.params, { deep: true });
  }

  return config;
});

api.interceptors.response.use((response) => {
  if (response.data && typeof response.data === "object") {
    response.data = camelcaseKeys(response.data, { deep: true });
  }
  return response;
});

export default api;
