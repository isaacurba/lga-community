import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scrolls to the top left of the document
    window.scrollTo(0, 0);
  }, [pathname]); // This dependency array ensures the effect runs only when the pathname changes

  return <Outlet />;
}

export default ScrollToTop;
