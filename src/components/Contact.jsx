import { useState, useEffect } from "react";
import { api } from "../globals/global";

export default function Contact() {
  const [contactContent, setcontactContent] = useState(false);

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

  const handleCopyEmail = () => {
    /* Copy the text inside the text field */
    navigator.clipboard.writeText("xzr");
  };

  return (
    contactContent && (
      <section className='contact-section'>
        <ul>
          {contactContent.contact_sentence_repeater.map((oneSentence, i) => {
            return <li key={i}>{oneSentence.contact_sentence}</li>;
          })}
        </ul>
        <button onClick={handleCopyEmail}>Yes</button>
      </section>
    )
  );
}
