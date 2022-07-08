import axios from "axios";

export const appTitle = "Rui Xu | Front End Developer | UX Desinger";

export const api = axios.create({
  baseURL: "http://localhost:8888/Personal/web-portfolio/wp-json/wp/v2",
});

// Get the image alt text from image URL
export const getAlt = URL => {
  return URL.substring(URL.lastIndexOf("/") + 1, URL.lastIndexOf("."));
};

// Project custom taxonomy
export const FEATURED = 4;
export const FUN = 5;

export const params = { acf_format: "standard" };
export const params_project = {
  acf_format: "standard",
  orderby: "menu_order",
  order: "desc",
};
