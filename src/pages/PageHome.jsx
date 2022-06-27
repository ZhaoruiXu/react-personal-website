import { appTitle, api, getAlt, FEATURED, FUN } from "../globals/global";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PageHome() {
  const [homeAboutContent, setHomeAboutContent] = useState(false);
  const [homeFeaturedProjectContent, setHomeFeaturedProjectContent] =
    useState(false);
  const [homeFunProjectContent, setHomeFunProjectContent] = useState(false);
  const [displayProjects, setDisplayProjects] = useState(false);
  // const [projectCategory, setProjectCategory] = useState(4);
  const [isLoadMore, setIsLoadMore] = useState(false);

  useEffect(() => {
    document.title = `${appTitle} | Front End Developer | UX Desinger`;

    const params_about = { acf_format: "standard" };
    const params_featured_propject = {
      acf_format: "standard",
      "fwd-project-category": FEATURED,
    };
    const params_fun_propject = {
      acf_format: "standard",
      "fwd-project-category": FUN,
    };

    const fetchHomeContent = async () => {
      try {
        const response_about = await api.get("pages/9", {
          params: params_about,
        });

        const response_featured_project = await api.get("fwd-project", {
          params: params_featured_propject,
        });

        const response_fun_project = await api.get("fwd-project", {
          params: params_fun_propject,
        });

        response_about &&
          response_about.data &&
          setHomeAboutContent(response_about.data.acf);
        console.log("1", response_about.data.acf);

        if (response_featured_project && response_featured_project.data) {
          setHomeFeaturedProjectContent(response_featured_project.data);
          setDisplayProjects(response_featured_project.data);
          console.log("2", response_featured_project.data);
        }

        response_fun_project &&
          response_fun_project.data &&
          setHomeFunProjectContent(response_fun_project.data);
        console.log("4", response_fun_project.data);
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
      // if not showing more
      setDisplayProjects(prev => [...prev, ...homeFunProjectContent]);
    } else {
      setDisplayProjects(homeFeaturedProjectContent);
    }
    setIsLoadMore(!isLoadMore);
    console.log("haha", displayProjects);
  };

  return (
    <section className='home-page'>
      {homeAboutContent && (
        <section className='about'>
          <h2>{homeAboutContent.about_opening_sentence_header}</h2>
          <p>{homeAboutContent.about_my_title}</p>
          <Link></Link>
        </section>
      )}

      <section className='projects-preview'>
        {displayProjects &&
          displayProjects.map((oneProject, index) => {
            return (
              <article key={index} className='project-preview'>
                {oneProject.acf.preview_page_image && (
                  <img
                    src={oneProject.acf.preview_page_image}
                    alt={getAlt(oneProject.acf.preview_page_image)}
                  />
                )}
                <h3>{oneProject.acf.project_title}</h3>
                <ul className='project-tools'>
                  {oneProject.acf.project_tools.map((oneTool, index) => {
                    return <li key={index}>{oneTool.project_tool}</li>;
                  })}
                </ul>
                <p className='project-description'>
                  {oneProject.acf.project_preview_description}
                </p>
                <ul className='project-links'>
                  <li>
                    <a href={oneProject.acf.links[0].live_site_link}>
                      Live Site
                    </a>
                  </li>

                  {oneProject["fwd-project-category"][0] === FEATURED && (
                    <li>
                      <Link to={`/project/${oneProject.slug}`}>Learn More</Link>
                    </li>
                  )}
                </ul>
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
