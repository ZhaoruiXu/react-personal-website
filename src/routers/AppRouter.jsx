// Development Components
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import Contact from "../components/Contact";

// Pages
import PageHome from "../pages/PageHome";
import PageAbout from "../pages/PageAbout";
import PageIndividualProject from "../pages/PageIndividualProject";

function AppRouter() {
  return (
    <BrowserRouter basename='/react-portfolio'>
      <a href='#site-main' className='screen-reader-text'>
        Skip to main page
      </a>
      <div className='wrapper'>
        <Header />
        <main id='site-main'>
          <Routes>
            <Route path='/' element={<PageHome />} />
            <Route path='/about' element={<PageAbout />} />
            <Route path='/project/:id' element={<PageIndividualProject />} />
            <Route path='*' element={<PageHome />} />
          </Routes>
          <Contact />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
