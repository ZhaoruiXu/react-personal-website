import { appTitle, api } from "../globals/global";
import { useEffect, useState } from "react";

export default function PageHome() {
  const [homeAboutContent, setHomeAboutContent] = useState(false);
  const [homeProjectContent, setHomeProjectContent] = useState([]);
  const [projectCategory, setProjectCategory] = useState(4);
  const [isLoadMore, setIsLoadMore] = useState(false);

  useEffect(() => {
    document.title = `${appTitle} | Front End Developer | UX Desinger`;

    const params_about = { acf_format: "standard" };

    const fetchHomeAboutContent = async () => {
      try {
        const response_about = await api.get("pages/9", {
          params: params_about,
        });

        response_about &&
          response_about.data &&
          setHomeAboutContent(response_about.data.acf);
        console.log("1", response_about.data.acf);
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
    fetchHomeAboutContent();
  }, []);

  useEffect(() => {
    const params_propject = {
      acf_format: "standard",
      "fwd-project-category": projectCategory,
    };
    const fetchHomeProjectContent = async () => {
      try {
        const response_project = await api.get("fwd-project", {
          params: params_propject,
        });

        response_project &&
          response_project.data &&
          setHomeProjectContent(prev => [...prev, ...response_project.data]);
        console.log("2", response_project.data);
        console.log("3", homeProjectContent);
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
    fetchHomeProjectContent();
  }, [projectCategory]);

  const handleShowMoreProject = () => {
    if (!isLoadMore) {
      setProjectCategory(5);
    } else {
      setProjectCategory(4);
      setHomeProjectContent([]);
    }
    setIsLoadMore(!isLoadMore);
  };

  return (
    <section className='home-page'>
      <section className='projects-preview'>
        {homeProjectContent.map((oneProject, index) => {
          return (
            <article key={index} className='project-preview'>
              <h3>{oneProject.acf.project_title}</h3>
            </article>
          );
        })}
        <button onClick={handleShowMoreProject}>
          {isLoadMore ? "show less" : "show more"}
        </button>
      </section>
    </section>
  );
}
