import axios from "axios";

export const appTitle = "Rui Xu";

export const api = axios.create({
  baseURL: "http://localhost:8888/Personal/web-portfolio/wp-json/wp/v2",
});

export const getAlt = URL => {
  return URL.substring(URL.lastIndexOf("/") + 1, URL.lastIndexOf("."));
};
