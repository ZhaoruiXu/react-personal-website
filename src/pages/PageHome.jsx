import { appTitle, aboutPageBaseURL } from "../globals/global";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

export default function PageHome() {
  // const [homeContent, setHomeContent] = useState(false);

  // useEffect(() => {
  // document.title = `${appTitle} | Front End Developer | UX Desinger`;

  //   const params = { acf_format: "standard" };
  //   axios.get(aboutPageBaseURL, { params }).then(response => {
  //     setAboutContent(response.data);
  //     console.log(response.data);
  //   });
  // }, []);
  return <section className='home-page'></section>;
}
