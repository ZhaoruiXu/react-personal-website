import { FEATURED, FUN } from "../globals/global";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";

export default function PageHome({
  aboutContent,
  projectContent,
  isLoaded,
  playLoadingAnimation,
}) {
  const [displayProjects, setDisplayProjects] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);

  useEffect(() => {
    if (projectContent) {
      const filteredProjects = projectContent.filter(
        oneProject => oneProject["fwd-project-category"][0] === FEATURED
      );
      setDisplayProjects(filteredProjects);
    }
  }, [projectContent]);

  const handleShowMoreProject = () => {
    if (!isLoadMore) {
      // to show more (add fun projects)
      const filteredProjects = projectContent.filter(
        oneProject => oneProject["fwd-project-category"][0] === FUN
      );
      setDisplayProjects(prev => [...prev, ...filteredProjects]);
    } else {
      // to show less (only featured projects)
      const filteredProjects = projectContent.filter(
        oneProject => oneProject["fwd-project-category"][0] === FEATURED
      );
      setDisplayProjects(filteredProjects);
    }
    setIsLoadMore(!isLoadMore);
  };

  return (
    <section className='home-page-section'>
      {isLoaded && (
        <section className='about-section'>
          <h1 className='screen-reader-text'>Project page</h1>
          {aboutContent.about_opening_sentence_header_repeater.map(
            (header, index) => {
              return (
                <h2
                  key={index}
                  className={
                    !isLoaded || playLoadingAnimation ? "" : "animate"
                  }>
                  {header.item}
                </h2>
              );
            }
          )}
          <div
            className={`about-sentences ${
              !isLoaded || playLoadingAnimation ? "" : "animate"
            }`}>
            <div>
              {aboutContent.about_opening_sentence_repeater.map(
                (sentence, index) => {
                  return <p key={index}>{sentence.item}</p>;
                }
              )}
            </div>
          </div>
          <Link
            className={`about-me-btn ${
              !isLoaded || playLoadingAnimation ? "" : "animate"
            }`}
            to='/about'>
            <p>About Me</p>
          </Link>
        </section>
      )}

      <section
        className='projects-preview'
        style={{ minHeight: displayProjects ? "" : "100vh" }}>
        {displayProjects &&
          displayProjects.map((oneProject, index) => {
            return (
              <ProjectCard
                key={index}
                data={oneProject}
                isLoaded={isLoaded}
                playLoadingAnimation={playLoadingAnimation}
              />
            );
          })}

        {isLoaded && (
          <button
            className='show-more-less-btn'
            onClick={handleShowMoreProject}>
            {isLoadMore ? "Show Less" : "Show More"}
          </button>
        )}
      </section>
    </section>
  );
}
