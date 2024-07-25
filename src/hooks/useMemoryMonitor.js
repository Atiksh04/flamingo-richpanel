import { useState, useEffect } from 'react';

const useMemoryMonitor = () => {
  const [memoryUsage, setMemoryUsage] = useState(null);

  useEffect(() => {
    const updateMemoryUsage = () => {
      if (performance.memory) {
        const { usedJSHeapSize } = performance.memory;
        if (typeof usedJSHeapSize === 'number') {
          setMemoryUsage(usedJSHeapSize / (1024 * 1024)); // Convert to MB
        } else {
          setMemoryUsage(null); // Handle unsupported or faulty values
        }
      } else {
        setMemoryUsage(null); // API not supported
      }
    };

    updateMemoryUsage(); // Initial call

    // Update memory usage every 5 seconds
    const intervalId = setInterval(updateMemoryUsage, 2000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return memoryUsage;
};

export default useMemoryMonitor;
