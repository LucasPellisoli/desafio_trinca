import axios from "axios";

let _baseUrl =
  process.env.NODE_ENV === "production"
    ? "/api/"
    : "http://localhost:3000/api/";
const instance = axios.create({
  baseURL: _baseUrl,
  timeout: 30000,
});

export default instance;
