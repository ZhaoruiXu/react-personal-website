import { getAlt, FEATURED, FUN } from "../globals/global";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

export default function ProjectCard({ data, isLoaded, playLoadingAnimation }) {
  const projectCardRef = useRef();
  const animation = useAnimation();

  useEffect(() => {
    let timer;

    const observerFunc = () => {
      const observer = new IntersectionObserver(
        entries => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            animation.start({
              y: 0,
              opacity: [0, 0, 1],
              transition: {
                times: [0, 0.25, 1],
                type: "tween",
                duration: 0.75,
                ease: "easeInOut",
              },
            });
            observer.unobserve(projectCardRef.current);
          }
        },
        { threshold: 0 }
      );
      observer.observe(projectCardRef.current);
    };

    if (isLoaded && !playLoadingAnimation) {
      timer = setTimeout(() => observerFunc(), 500);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [animation, playLoadingAnimation, isLoaded]);

  return (
    <motion.article
      className='project-card'
      ref={projectCardRef}
      animate={animation}
      initial={{ y: "5rem", opacity: 0 }}>
      <div className='project-card-wrapper'>
        {data.acf.preview_page_image && (
          <div className='project-image'>
            <img
              src={data.acf.preview_page_image}
              alt={getAlt(data.acf.preview_page_image)}
              onClick={() =>
                data.acf.links[0].live_site_link &&
                window.open(data.acf.links[0].live_site_link)
              }
            />
          </div>
        )}
        <motion.div
          className='project-content'
          initial={{ y: "10rem", opacity: 0 }}
          animate={animation}>
          <div className='project-content-wrapper'>
            <h3>{data.acf.project_title}</h3>
            <ul className='project-tools'>
              {data.acf.project_tools.map((oneTool, index) => {
                return (
                  <li key={index}>
                    <p>
                      {oneTool.project_tool}
                      {index !== data.acf.project_tools.length - 1 && (
                        <span>·</span>
                      )}
                    </p>
                  </li>
                );
              })}
            </ul>
            <p className='project-description'>
              {data.acf.project_preview_description}
            </p>
            <ul className='project-links'>
              <li>
                <a
                  href={data.acf.links[0].live_site_link}
                  target='_blank'
                  rel='noopener noreferrer'>
                  Live Site
                </a>
              </li>

              {data["fwd-project-category"][0] === FEATURED && (
                <li>
                  <Link to={`/project/${data.slug}`}>Learn More</Link>
                </li>
              )}
              {data["fwd-project-category"][0] === FUN && (
                <li>
                  <a
                    href={data.acf.links[0].github_link}
                    target='_blank'
                    rel='noopener noreferrer'>
                    GitHub
                  </a>
                </li>
              )}
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}
