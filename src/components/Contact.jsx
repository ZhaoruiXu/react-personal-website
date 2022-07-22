import { useState, useEffect, useRef } from "react";
import GitHubLogo from "./GitHubLogo";
import LinkedInLogo from "./LinkedInLogo";
import { motion } from "framer-motion";

export default function Contact({ contactContent }) {
  const [contactBtnMsg, setContactBtnMsg] = useState("email me");
  const [isContactBtnEnter, setIsContactBtnEnter] = useState(false);
  // const [isContactBtnEnterMobile, setIsContactBtnEnterMobile] = useState(false);
  const isContactBtnEnterMobile = useRef(null);

  useEffect(() => {
    const handleContactEmailMounseEnter = () => {
      if (isContactBtnEnter && !isContactBtnEnterMobile.current) {
        setContactBtnMsg("copy email");
      } else {
        isContactBtnEnterMobile.current = false;
      }
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
    setIsContactBtnEnter(true);
    isContactBtnEnterMobile.current = true;
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
        <motion.button
          drag
          dragConstraints={{
            right: 0,
            left: 0,
            top: 0,
            bottom: 0,
          }}
          onClick={handleCopyEmail}
          onMouseEnter={() => setIsContactBtnEnter(true)}
          onMouseLeave={() => {
            setContactBtnMsg("email me");
            setIsContactBtnEnter(false);
          }}>
          {contactBtnMsg}
        </motion.button>
      </section>
    )
  );
}
