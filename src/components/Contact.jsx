import { useState, useEffect } from "react";
import GitHubLogo from "./GitHubLogo";
import LinkedInLogo from "./LinkedInLogo";

export default function Contact({ contactContent }) {
  const [contactBtnMsg, setContactBtnMsg] = useState("email me");
  const [isContactBtnEnter, setIsContactBtnEnter] = useState(false);

  useEffect(() => {
    const handleContactEmailMounseEnter = () => {
      isContactBtnEnter && setContactBtnMsg("copy email");
    };

    const timer = setTimeout(handleContactEmailMounseEnter, 150);

    return () => {
      clearTimeout(timer);
    };
  }, [isContactBtnEnter]);

  const handleCopyEmail = () => {
    /* Copy the text inside the text field */
    navigator.clipboard.writeText("xzr0429@gmail.com");
    setContactBtnMsg("email copied");
  };

  return (
    contactContent && (
      <section className='contact'>
        <ul>
          {contactContent.contact_sentence_repeater.map((oneSentence, i) => {
            return <li key={i}>{oneSentence.contact_sentence}</li>;
          })}
          <li className='social-media'>
            <a href='https://github.com/ZhaoruiXu'>
              <GitHubLogo />
            </a>
            <a href='https://www.linkedin.com/in/zhaorui-xu/'>
              <LinkedInLogo />
            </a>
          </li>
        </ul>
        <button
          onClick={handleCopyEmail}
          onMouseEnter={() => setIsContactBtnEnter(true)}
          onMouseLeave={() => {
            setContactBtnMsg("email me");
            setIsContactBtnEnter(false);
          }}>
          {contactBtnMsg}
        </button>
      </section>
    )
  );
}
