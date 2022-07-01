import { appTitle, api, FEATURED, FUN } from "../globals/global";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";

export default function PageHome() {
  const [homeAboutContent, setHomeAboutContent] = useState(false);
  const [homeProjectContent, setHomeProjectContent] = useState(false);
  const [displayProjects, setDisplayProjects] = useState(false);

  // const [projectCategory, setProjectCategory] = useState(4);
  const [isLoadMore, setIsLoadMore] = useState(false);

  useEffect(() => {
    document.title = `${appTitle} | Front End Developer | UX Desinger`;

    const params_about = { acf_format: "standard" };
    const params_project = {
      acf_format: "standard",
      orderby: "menu_order",
      order: "desc",
    };

    const fetchHomeContent = async () => {
      try {
        const response_about = await api.get("pages/9", {
          params: params_about,
        });

        const response_project = await api.get("fwd-project", {
          params: params_project,
        });

        response_about &&
          response_about.data &&
          setHomeAboutContent(response_about.data.acf);
        console.log("1", response_about.data.acf);

        if (response_project && response_project.data) {
          setHomeProjectContent(response_project.data);
          console.log("4", response_project.data);
          const filteredProjects = response_project.data.filter(
            oneProject => oneProject["fwd-project-category"][0] === FEATURED
          );
          setDisplayProjects(filteredProjects);
        }
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

    fetchHomeContent();
  }, []);

  const handleShowMoreProject = () => {
    if (!isLoadMore) {
      // to show more (add fun projects)
      const filteredProjects = homeProjectContent.filter(
        oneProject => oneProject["fwd-project-category"][0] === FUN
      );
      setDisplayProjects(prev => [...prev, ...filteredProjects]);
    } else {
      // to show less (only featured projects)
      const filteredProjects = homeProjectContent.filter(
        oneProject => oneProject["fwd-project-category"][0] === FEATURED
      );
      setDisplayProjects(filteredProjects);
    }
    setIsLoadMore(!isLoadMore);
    console.log("haha", displayProjects);
  };

  return (
    <section className='home-page'>
      {homeAboutContent && (
        <section className='about'>
          <h2>{homeAboutContent.about_opening_sentence_header}</h2>
          <p>{homeAboutContent.about_opening_sentence_paragraph}</p>
          <Link to='/about'>About Me</Link>
        </section>
      )}

      <section className='projects-preview'>
        {displayProjects &&
          displayProjects.map((oneProject, index) => {
            return <ProjectCard key={index} data={oneProject} />;
          })}

        <button onClick={handleShowMoreProject}>
          {isLoadMore ? "show less" : "show more"}
        </button>
      </section>
    </section>
  );
}
