import { appTitle, api } from "../globals/global";
import { useEffect, useState } from "react";

export default function PageHome() {
  const [homeAboutContent, setHomeAboutContent] = useState(false);
  const [homeProjectContent, setHomeProjectContent] = useState(false);
  const [projectCategory, setProjectCategory] = useState(4);

  useEffect(() => {
    document.title = `${appTitle} | Front End Developer | UX Desinger`;

    const params_about = { acf_format: "standard" };
    const params_propject = {
      acf_format: "standard",
      "fwd-project-category": projectCategory,
    };

    const fetchAboutContent = async () => {
      try {
        const response_about = await api.get("pages/9", {
          params: params_about,
        });

        const response_project = await api.get("fwd-project", {
          params: params_propject,
        });

        response_about &&
          response_about.data &&
          setHomeAboutContent(response_about.data.acf);
        console.log("1", response_about.data.acf);

        response_project &&
          response_project.data &&
          setHomeProjectContent(response_project.data);
        console.log("2", response_project.data);
      } catch (err) {
        if (err.response) {
          // not in the 200 response rang
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          // all the other errors
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fetchAboutContent();
  }, [projectCategory]);
  return <section className='home-page'></section>;
}
