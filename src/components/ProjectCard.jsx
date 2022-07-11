import { getAlt, FEATURED, FUN } from "../globals/global";
import { Link } from "react-router-dom";

export default function ProjectCard({ data }) {
  // const navigate = useNavigate();
  return (
    <article className='project-card'>
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
        <div className='project-content'>
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
        </div>
      </div>
    </article>
  );
}
