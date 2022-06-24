import { appTitle, api, getAlt } from "../globals/global";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PageIndividualProject() {
  const [projectContent, setProjectContent] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    document.title = `| ${appTitle}`;

    const params = { acf_format: "standard", slug: id };

    const fetchProjectContent = async () => {
      try {
        if (id || id !== undefined) {
          const response = await api.get("fwd-project", {
            params,
          });
          response && response.data && setProjectContent(response.data[0].acf);
          console.log(response.data[0].acf);
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
    fetchProjectContent();
  }, [id]);

  return (
    projectContent && (
      <section className='single-project-page-section'>
        <h1 className='scree-reader-text'>single project page for {id}</h1>
        <h2>{projectContent.project_title}</h2>
        {projectContent.detail_page_images.map((oneImageURL, index) => {
          let altMsg = getAlt(oneImageURL);
          return <img key={index} src={oneImageURL} alt={altMsg} />;
        })}
        {Object.keys(projectContent.links[0]).map((oneLink, index) => {
          return (
            <a key={index} href={projectContent.links[0][oneLink]} target='_'>
              {oneLink === "github_link" ? "GitHub" : "Live Site"}
            </a>
          );
        })}

        {/* <a href={projectContent.links[0].live_site_link} target='_'>
          Live Site
        </a>
        <a href={projectContent.links[0].github_link} target='_'>
          GitHub
        </a> */}

        <article className='project-about'>
          <h3>{projectContent.project_about_header}</h3>
          <p>{projectContent.project_about_content}</p>
        </article>

        <article className='project-specs'>
          <h3>{projectContent.project_specification_header}</h3>

          <div className='project-one-spec'></div>
        </article>
      </section>
    )
  );
}
