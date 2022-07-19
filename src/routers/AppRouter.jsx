// Development Components
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { appTitle, api, params, params_project } from "../globals/global";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import ScrollToTop from "../components/ScrollToTop";

// Pages
import PageHome from "../pages/PageHome";
import PageAbout from "../pages/PageAbout";
import PageIndividualProject from "../pages/PageIndividualProject";

function AppRouter() {
  const [aboutContent, setAboutContent] = useState(false);
  const [projectContent, setProjectContent] = useState(false);
  const [contactContent, setContactContent] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    document.title = `${appTitle}`;

    const fetchHomeContent = async () => {
      try {
        const response_about = await api.get("pages/9", {
          params,
        });

        const response_project = await api.get("fwd-project", {
          params: params_project,
        });

        const response_contact = await api.get("pages/94", {
          params,
        });

        response_about.data && setAboutContent(response_about.data.acf);

        response_project.data && setProjectContent(response_project.data);
        console.log(response_project.data);
        response_contact.data && setContactContent(response_contact.data.acf);

        setIsLoaded(true);
      } catch (err) {
        setIsLoaded(false);
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

    fetchHomeContent();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop>
        <a href='#site-main' className='screen-reader-text'>
          Skip to main page
        </a>
        <div className='wrapper'>
          <Header />
          <main id='site-main'>
            <Routes>
              <Route
                path='/'
                element={
                  <PageHome
                    aboutContent={aboutContent}
                    projectContent={projectContent}
                    isLoaded={isLoaded}
                  />
                }
              />
              <Route
                path='/about'
                element={
                  <PageAbout aboutContent={aboutContent} isLoaded={isLoaded} />
                }
              />
              <Route
                path='/project/:slug'
                element={
                  <PageIndividualProject
                    projectContent={projectContent}
                    isLoaded={isLoaded}
                  />
                }
              />
              <Route
                path='*'
                element={
                  <PageHome
                    aboutContent={aboutContent}
                    projectContent={projectContent}
                    isLoaded={isLoaded}
                  />
                }
              />
            </Routes>
            <Contact contactContent={contactContent} />
          </main>
          <Footer />
        </div>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default AppRouter;
