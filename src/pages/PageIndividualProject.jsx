import { appTitle, api, getAlt } from "../globals/global";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PageIndividualProject() {
  const [projectContent, setProjectContent] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    document.title = `${slug}| ${appTitle}`;

    const params = { acf_format: "standard", slug };

    const fetchProjectContent = async () => {
      try {
        if (slug || slug !== undefined) {
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
  }, [slug]);

  return (
    projectContent && (
      <section className='single-project-page-section'>
        <h1 className='scree-reader-text'>single project page for {slug}</h1>
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
          {projectContent.project_specification_items &&
            projectContent.project_specification_items.map(
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
          <h3>{projectContent.project_feature_header}</h3>
          {projectContent.project_feature_repeater &&
            projectContent.project_feature_repeater.map((oneFeature, index) => {
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
          <h3>{projectContent.project_design_header}</h3>
          {projectContent.project_design_repeater &&
            projectContent.project_design_repeater.map((oneDesign, index) => {
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
          <h3>{projectContent.project_reflection_header}</h3>
          <p>{projectContent.project_reflection_content}</p>
        </article>
      </section>
    )
  );
}
