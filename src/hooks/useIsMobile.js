import { useState, useEffect } from 'react';

const useIsMobile = (breakpoint = 670) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth - 50);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width - 50);
      setIsMobile(width <= breakpoint);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return { isMobile, windowWidth };
};

export default useIsMobile;
