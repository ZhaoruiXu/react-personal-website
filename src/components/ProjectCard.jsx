import { getAlt, FEATURED } from "../globals/global";
import { Link } from "react-router-dom";

export default function ProjectCard({ data }) {
  return (
    <article className='project-preview'>
      {data.acf.preview_page_image && (
        <img
          src={data.acf.preview_page_image}
          alt={getAlt(data.acf.preview_page_image)}
        />
      )}
      <h3>{data.acf.project_title}</h3>
      <ul className='project-tools'>
        {data.acf.project_tools.map((oneTool, index) => {
          return <li key={index}>{oneTool.project_tool}</li>;
        })}
      </ul>
      <p className='project-description'>
        {data.acf.project_preview_description}
      </p>
      <ul className='project-links'>
        <li>
          <a href={data.acf.links[0].live_site_link}>Live Site</a>
        </li>

        {data["fwd-project-category"][0] === FEATURED && (
          <li>
            <Link to={`/project/${data.slug}`}>Learn More</Link>
          </li>
        )}
      </ul>
    </article>
  );
}
