// Development Components
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { appTitle, api, params_about, params_project } from "../globals/global";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import Contact from "../components/Contact";

// Pages
import PageHome from "../pages/PageHome";
import PageAbout from "../pages/PageAbout";
import PageIndividualProject from "../pages/PageIndividualProject";

function AppRouter() {
  const [aboutContent, setAboutContent] = useState(false);
  const [projectContent, setProjectContent] = useState(false);

  useEffect(() => {
    document.title = `${appTitle}`;

    const fetchHomeContent = async () => {
      try {
        const response_about = await api.get("pages/9", {
          params: params_about,
        });

        const response_project = await api.get("fwd-project", {
          params: params_project,
        });

        response_about.data && setAboutContent(response_about.data.acf);
        console.log("about", response_about.data.acf);

        response_project.data && setProjectContent(response_project.data);
        console.log("project", response_project.data);
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

    fetchHomeContent();
  }, []);

  return (
    <BrowserRouter basename='/react-portfolio'>
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
                />
              }
            />
            <Route
              path='/about'
              element={<PageAbout aboutContent={aboutContent} />}
            />
            <Route
              path='/project/:slug'
              element={
                <PageIndividualProject projectContent={projectContent} />
              }
            />
            <Route
              path='*'
              element={
                <PageHome
                  aboutContent={aboutContent}
                  projectContent={projectContent}
                />
              }
            />
          </Routes>
          <Contact />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
