import { appTitle, getAlt } from "../globals/global";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PageIndividualProject({ projectContent }) {
  const [currentProject, setCurrentProject] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    document.title = `${slug} | ${appTitle}`;

    if (projectContent) {
      const filteredProjects = projectContent.filter(
        oneProject => oneProject.slug[0] === slug
      );
      setCurrentProject(filteredProjects);
    }
  }, [projectContent, slug]);

  return (
    currentProject && (
      <section className='single-project-page-section'>
        <h1 className='scree-reader-text'>single project page for {slug}</h1>
        <h2>{currentProject.project_title}</h2>
        {currentProject.detail_page_images.map((oneImageURL, index) => {
          let altMsg = getAlt(oneImageURL);
          return <img key={index} src={oneImageURL} alt={altMsg} />;
        })}
        {Object.keys(currentProject.links[0]).map((oneLink, index) => {
          return (
            <a key={index} href={currentProject.links[0][oneLink]} target='_'>
              {oneLink === "github_link" ? "GitHub" : "Live Site"}
            </a>
          );
        })}

        {/* <a href={currentProject.links[0].live_site_link} target='_'>
          Live Site
        </a>
        <a href={currentProject.links[0].github_link} target='_'>
          GitHub
        </a> */}

        <article className='project-about'>
          <h3>{currentProject.project_about_header}</h3>
          <p>{currentProject.project_about_content}</p>
        </article>

        <article className='project-specs'>
          <h3>{currentProject.project_specification_header}</h3>
          {currentProject.project_specification_items &&
            currentProject.project_specification_items.map(
              (specItems, index) => {
                return (
                  <div key={index} className='project-specs-fields'>
                    <h4>{specItems.project_specification_item_title}</h4>
                    <ul>
                      {specItems.project_specification_item_repeater &&
                        specItems.project_specification_item_repeater.map(
                          (oneSpecItem, index) => {
                            return (
                              <li key={index}>
                                {oneSpecItem.project_specification_item}
                              </li>
                            );
                          }
                        )}
                    </ul>
                  </div>
                );
              }
            )}
          <div className='project-one-spec'></div>
        </article>

        <article className='project-features'>
          <h3>{currentProject.project_feature_header}</h3>
          {currentProject.project_feature_repeater &&
            currentProject.project_feature_repeater.map((oneFeature, index) => {
              return (
                <div key={index} className='feature-fields'>
                  <h4>{oneFeature.project_feature_title}</h4>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: oneFeature.project_feature_content,
                    }}></div>
                  {oneFeature.project_feature_gallery &&
                    oneFeature.project_feature_gallery.map(
                      (oneImageURL, index) => {
                        let altMsg = getAlt(oneImageURL);
                        return (
                          <img key={index} src={oneImageURL} alt={altMsg} />
                        );
                      }
                    )}
                </div>
              );
            })}
        </article>

        <article className='project-designs'>
          <h3>{currentProject.project_design_header}</h3>
          {currentProject.project_design_repeater &&
            currentProject.project_design_repeater.map((oneDesign, index) => {
              return (
                <div key={index} className='design-fields'>
                  <h4>{oneDesign.project_design_title}</h4>
                  <p>{oneDesign.project_design_content}</p>
                  {oneDesign.project_design_gallery &&
                    oneDesign.project_design_gallery.map(
                      (oneImageURL, index) => {
                        let altMsg = getAlt(oneImageURL);
                        return (
                          <img key={index} src={oneImageURL} alt={altMsg} />
                        );
                      }
                    )}
                </div>
              );
            })}
        </article>

        <article className='project-reflection'>
          <h3>{currentProject.project_reflection_header}</h3>
          <p>{currentProject.project_reflection_content}</p>
        </article>
      </section>
    )
  );
}
