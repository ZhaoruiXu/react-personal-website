import { appTitle, aboutPageBaseURL } from "../globals/global";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PageAbout() {
  const [aboutContent, setAboutContent] = useState(false);

  useEffect(() => {
    document.title = `About ${appTitle} | Front End Developer | UX Desinger`;

    const params = { acf_format: "standard" };
    axios.get(aboutPageBaseURL, { params }).then(response => {
      setAboutContent(response.data.acf);
      console.log(response.data.acf);
    });
  }, []);
  return (
    <section className='about-page'>
      <h2>{aboutContent.about_my_name}</h2>
      <p>{aboutContent.about_my_title}</p>
      <img
        src={aboutContent.about_my_illustration.sizes.thumbnail}
        alt={aboutContent.about_my_illustration.caption}
      />
    </section>
  );
}
