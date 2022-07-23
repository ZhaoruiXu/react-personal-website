import { appTitle } from "../globals/global";
import { useEffect } from "react";
import AnimationObserver from "../components/AnimationObserver";

export default function PageAbout({
  aboutContent,
  isLoaded,
  playLoadingAnimation,
}) {
  useEffect(() => {
    document.title = `About ${appTitle}`;
  }, []);

  return (
    <section
      className='about-page-section'
      style={{ minHeight: isLoaded ? "" : "100vh" }}>
      {aboutContent && !playLoadingAnimation && (
        <AnimationObserver>
          <h1 className='screen-reader-text'>About page</h1>
          <h2 className='animate fade-in-down animation-delay-300'>
            {aboutContent.about_my_name}
          </h2>
          <h3 className='about-my-title animate fade-in-up animation-delay-300'>
            {aboutContent.about_my_title}
          </h3>
          <div className='about-my-illustration animate fade-in-up animation-delay-500'>
            {aboutContent.about_my_illustration.sizes.large && (
              <img
                src={aboutContent.about_my_illustration.sizes.large}
                alt={aboutContent.about_my_illustration.caption}
              />
            )}
          </div>
          <div className='about-skill'>
            <div className='about-skill-wrapper'>
              <h3 className='animate fade-in-up animation-delay-300'>
                {aboutContent.about_skill_header}
              </h3>
              <div className='skill-category-wrapper'>
                {aboutContent.about_skill.map((oneSkillCategory, i) => {
                  return (
                    <section
                      key={i}
                      className='skill-category animate fade-in-up animation-duration-500 animation-delay-500'>
                      <h4>{oneSkillCategory.skill_category}</h4>
                      <ul>
                        {oneSkillCategory.skills.map((oneSkill, i) => {
                          return <li key={i}>{oneSkill.individual_skill}</li>;
                        })}
                      </ul>
                    </section>
                  );
                })}
              </div>
            </div>
          </div>
          <div className='about-qanda-wrapper'>
            <h3 className='animate fade-in-up'>
              {aboutContent.about_q_and_a_header}
            </h3>
            {aboutContent.about_q_and_a_content.map((oneQAndA, i) => {
              return (
                <article key={i} className='single-qanda-wrapper'>
                  <h4 className='animate fade-in-up animation-delay-300'>
                    {oneQAndA.question}
                  </h4>
                  <p className='animate fade-in-up animation-duration-500 animation-delay-500'>
                    {oneQAndA.answer}
                  </p>
                </article>
              );
            })}
          </div>
        </AnimationObserver>
      )}
    </section>
  );
}
