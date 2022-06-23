import { appTitle, aboutPageBaseURL } from "../globals/global";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PageAbout() {
  const [aboutContent, setAboutContent] = useState(false);

  useEffect(() => {
    document.title = `About ${appTitle} | Front End Developer | UX Desinger`;

    const params = { acf_format: "standard" };
    axios.get(aboutPageBaseURL, { params }).then(response => {
      setAboutContent(response.data.acf);
      console.log(response.data.acf);
    });
  }, []);

  return (
    aboutContent && (
      <section className='about-page'>
        <h1 className='scree-reader-text'>About Me</h1>
        <h2>{aboutContent.about_my_name}</h2>
        <p>{aboutContent.about_my_title}</p>
        <img
          // can get the image size state by useState and matchMedia to update the image size state (might not work yet)
          src={aboutContent.about_my_illustration.sizes.thumbnail}
          alt={aboutContent.about_my_illustration.caption}
        />
        <h3>{aboutContent.about_skill_header}</h3>
        {aboutContent.about_skill.map((oneSkillCategory, i) => {
          return (
            <section key={i} className='skill-category'>
              <h4>{oneSkillCategory.skill_category}</h4>
              <ul>
                {oneSkillCategory.skills.map((oneSkill, i) => {
                  return <li key={i}>{oneSkill.individual_skill}</li>;
                })}
              </ul>
            </section>
          );
        })}
        <h3>{aboutContent.about_q_and_a_header}</h3>
        {aboutContent.about_q_and_a_content.map((oneQAndA, i) => {
          return (
            <section key={i} className='skill-category'>
              <h4>{oneQAndA.question}</h4>
              <p>{oneQAndA.answer}</p>
            </section>
          );
        })}
      </section>
    )
  );
}
