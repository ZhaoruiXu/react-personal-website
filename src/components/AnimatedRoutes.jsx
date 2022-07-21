import { useEffect } from "react";
import { useLocation } from "react-router";

const AnimatedRoutes = ({ children, handleLoadingAnimation }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    handleLoadingAnimation(true);

    const timer = setTimeout(() => {
      handleLoadingAnimation(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [location]);

  return <>{children}</>;
};

export default AnimatedRoutes;
