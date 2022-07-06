import { useState, useEffect } from "react";
import { api } from "../globals/global";
import github from "../images/github-icon.svg";
import linkedin from "../images/linkedin-icon.svg";

export default function Contact() {
  const [contactContent, setcontactContent] = useState(false);
  const [contactBtnMsg, setContactBtnMsg] = useState("yes");
  const [isContactBtnEnter, setIsContactBtnEnter] = useState(false);

  useEffect(() => {
    const params = { acf_format: "standard" };

    const fetchContactContent = async () => {
      try {
        const response = await api.get("pages/94", {
          params,
        });
        response && response.data && setcontactContent(response.data.acf);
        // console.log(response.data.acf);
      } catch (err) {
        if (err.response) {
          // not in the 200 response rang
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          // all the other errors
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fetchContactContent();
  }, []);

  useEffect(() => {
    const handleContactEmailMounseEnter = () => {
      isContactBtnEnter && setContactBtnMsg("copy email");
    };

    // debouce function to reduce API calls
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

  // const handleEnterEmail = () => {
  //   setTimeout(() => {
  //     setContactBtnMsg("copy email");
  //   }, 500);
  // };

  return (
    contactContent && (
      <section className='contact'>
        <ul>
          {contactContent.contact_sentence_repeater.map((oneSentence, i) => {
            return <li key={i}>{oneSentence.contact_sentence}</li>;
          })}
          <li className='social-media'>
            <a href='https://github.com/ZhaoruiXu'>
              <img src={github} alt='GitHub icon' />
            </a>
            <a href='https://www.linkedin.com/in/zhaorui-xu/'>
              <img src={linkedin} alt='LinkedIn icon' />
            </a>
          </li>
        </ul>
        <button
          onClick={handleCopyEmail}
          onMouseEnter={() => setIsContactBtnEnter(true)}
          onMouseLeave={() => {
            setContactBtnMsg("yes!");
            setIsContactBtnEnter(false);
          }}>
          {contactBtnMsg}
        </button>
      </section>
    )
  );
}
