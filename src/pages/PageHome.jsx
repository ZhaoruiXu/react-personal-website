import { FEATURED, FUN } from "../globals/global";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";

export default function PageHome({ aboutContent, projectContent, isLoaded }) {
  const [displayProjects, setDisplayProjects] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [showMoreLessBtnDelay, setShowMoreLessBtnDelay] = useState(false);

  useEffect(() => {
    if (projectContent) {
      const filteredProjects = projectContent.filter(
        oneProject => oneProject["fwd-project-category"][0] === FEATURED
      );
      setDisplayProjects(filteredProjects);
    }

    // to prevent flashing button between movie card loads
    setShowMoreLessBtnDelay(false);
    const timer = setTimeout(() => {
      setShowMoreLessBtnDelay(true);
    }, 700);

    return () => {
      clearTimeout(timer);
    };
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
    <section className='home-page'>
      {aboutContent && (
        <section className='about'>
          {aboutContent.about_opening_sentence_header_repeater.map(
            (header, index) => {
              return <h2 key={index}>{header.item}</h2>;
            }
          )}
          <div id='flip'>
            {aboutContent.about_opening_sentence_repeater.map(
              (sentence, index) => {
                return (
                  <div key={index}>
                    <p>{sentence.item}</p>
                  </div>
                );
              }
            )}
          </div>
          <div className='about-me-btn'>
            <Link to='/about'>About Me</Link>
          </div>
        </section>
      )}

      <section
        className='projects-preview'
        style={{ minHeight: displayProjects ? "" : "100vh" }}>
        {displayProjects &&
          displayProjects.map((oneProject, index) => {
            return <ProjectCard key={index} data={oneProject} />;
          })}

        {isLoaded && showMoreLessBtnDelay && (
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
