import { useEffect } from "react";
import { useLocation } from "react-router";

const AnimatedRoutes = ({ children, handleLoadingAnimation }) => {
  const location = useLocation();

  useEffect(() => {
    // Set page to the top
    window.scrollTo(0, 0);

    // Show loading screen
    handleLoadingAnimation(true);

    // Show loading screen for 2 second by default
    const timer = setTimeout(() => {
      handleLoadingAnimation(false);
    }, 2000);

    return () => {
      // Clear the previous setTimeout before the next one
      clearTimeout(timer);
    };
  }, [location, handleLoadingAnimation]);

  return <>{children}</>;
};

export default AnimatedRoutes;
