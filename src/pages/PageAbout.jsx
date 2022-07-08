import { appTitle } from "../globals/global";
import { useEffect } from "react";

export default function PageAbout({ aboutContent }) {
  // const [aboutContent, setAboutContent] = useState(false);

  useEffect(() => {
    document.title = `About ${appTitle}`;
  }, []);

  return (
    aboutContent && (
      <section className='about-page-section'>
        <h1 className='screen-reader-text'>About page</h1>

        <h2>{aboutContent.about_my_name}</h2>
        <h3 className='about-my-title'>{aboutContent.about_my_title}</h3>
        <img
          src={aboutContent.about_my_illustration.sizes.large}
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
