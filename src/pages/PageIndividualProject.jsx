import { appTitle, getAlt, FEATURED } from "../globals/global";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProjectCard from "../components/ProjectCard";
import AnimationObserver from "../components/AnimationObserver";
import GitHubLogo from "../components/GitHubLogo";
import LiveSiteLogo from "../components/LiveSiteLogo";

export default function PageIndividualProject({
  projectContent,
  isLoaded,
  playLoadingAnimation,
}) {
  const [currentProject, setCurrentProject] = useState(false);
  const [moreProjects, setMoreProjects] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    document.title = `${slug} | ${appTitle}`;

    if (projectContent) {
      const project = projectContent.filter(
        oneProject => oneProject.slug === slug
      );

      const otherFeaturedProjects = projectContent.filter(
        oneProject =>
          oneProject.slug !== slug &&
          oneProject["fwd-project-category"][0] === FEATURED
      );

      // Store the current project data
      setCurrentProject(project[0].acf);

      // Store up to two featured projects for more-projects section
      const filteredMoreProjects = otherFeaturedProjects.slice(0, 2);
      setMoreProjects(filteredMoreProjects);
    }
  }, [projectContent, slug]);

  return (
    <section
      className='single-project-page-section'
      style={{ minHeight: isLoaded ? "" : "100vh" }}>
      {currentProject && !playLoadingAnimation && (
        <AnimationObserver id={slug}>
          <h1 className='screen-reader-text'>single project page for {slug}</h1>
          <h2 className='animate fade-in-up animation-delay-300'>
            {currentProject.project_title}
          </h2>
          {currentProject.detail_page_images.map((oneImageURL, index) => {
            const altMsg = getAlt(oneImageURL);
            return (
              <div
                key={index}
                className='detail-page-images-wrapper animate fade-in-up animation-duration-1200 animation-delay-300'>
                <img src={oneImageURL} alt={altMsg} />
              </div>
            );
          })}
          <article className='project-about'>
            <h3 className='animate fade-in-up animation-delay-300'>
              {currentProject.project_about_header}
            </h3>
            <p className='animate fade-in-up animation-delay-500'>
              {currentProject.project_about_content}
            </p>
          </article>
          <article className='project-specs'>
            <h3 className='animate fade-in-up animation-delay-300'>
              {currentProject.project_specification_header}
            </h3>
            {currentProject.project_specification_items &&
              currentProject.project_specification_items.map(
                (specItems, index) => {
                  return (
                    <div
                      key={index}
                      className='project-specs-fields animate fade-in-up animation-duration-500 animation-delay-500'>
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
            <div className='project-specs-fields animate fade-in-up animation-duration-500 animation-delay-500'>
              <h4>Links</h4>
              <ul className='link-list'>
                {Object.keys(currentProject.links[0]).map((oneLink, index) => {
                  return (
                    <li key={index}>
                      <a href={currentProject.links[0][oneLink]} target='_'>
                        {oneLink === "github_link" ? (
                          <p>
                            <GitHubLogo />
                            <span>GitHub</span>
                          </p>
                        ) : (
                          <p>
                            <LiveSiteLogo />
                            <span>Live Site</span>
                          </p>
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>
          <article className='project-features'>
            <h3 className='animate fade-in-up'>
              {currentProject.project_feature_repeater &&
                currentProject.project_feature_header}
            </h3>
            {currentProject.project_feature_repeater &&
              currentProject.project_feature_repeater.map(
                (oneFeature, index) => {
                  return (
                    <div
                      key={index}
                      className='feature-fields animate fade-in-up'>
                      <div className='feature-content'>
                        <h4>{oneFeature.project_feature_title}</h4>
                        <p>{oneFeature.project_feature_content}</p>
                      </div>
                      {oneFeature.project_feature_gallery &&
                        oneFeature.project_feature_gallery.map(
                          (oneImageURL, index) => {
                            const altMsg = getAlt(oneImageURL);
                            return (
                              <div key={index} className='feature-image'>
                                <img src={oneImageURL} alt={altMsg} />
                              </div>
                            );
                          }
                        )}
                    </div>
                  );
                }
              )}
          </article>
          <article className='project-designs'>
            <h3 className='animate fade-in-up'>
              {currentProject.project_design_repeater &&
                currentProject.project_design_header}
            </h3>
            {currentProject.project_design_repeater &&
              currentProject.project_design_repeater.map((oneDesign, index) => {
                return (
                  <div key={index}>
                    <div className='design-content'>
                      <h4 className=' animate fade-in-up'>
                        {oneDesign.project_design_title}
                      </h4>
                      <p className='animate fade-in-up animation-delay-300'>
                        {oneDesign.project_design_content}
                      </p>
                    </div>
                    {oneDesign.project_design_gallery &&
                      oneDesign.project_design_gallery.map(
                        (oneImageURL, index) => {
                          const altMsg = getAlt(oneImageURL);
                          return (
                            <div
                              key={index}
                              className='design-image animate fade-in-up animation-delay-300'>
                              <img src={oneImageURL} alt={altMsg} />
                            </div>
                          );
                        }
                      )}
                  </div>
                );
              })}
          </article>
          <article className='project-reflection'>
            <h3 className='animate fade-in-up '>
              {currentProject.project_reflection_content &&
                currentProject.project_reflection_header}
            </h3>
            <p className='animate fade-in-up animation-delay-300'>
              {currentProject.project_reflection_content}
            </p>
          </article>
          <section className='more-projects-preview'>
            <h3 className='more-projects-header animate fade-in-up'>
              More Projects
            </h3>
            {moreProjects &&
              moreProjects.map((oneProject, index) => {
                return (
                  <ProjectCard
                    key={index}
                    data={oneProject}
                    isLoaded={isLoaded}
                    playLoadingAnimation={playLoadingAnimation}
                  />
                );
              })}
          </section>
        </AnimationObserver>
      )}
    </section>
  );
}
