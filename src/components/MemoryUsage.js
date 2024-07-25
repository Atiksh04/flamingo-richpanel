import React from 'react';
import useMemoryMonitor from '../hooks/useMemoryMonitor'; // Adjust the path as needed

const MemoryUsageDisplay = () => {
  const memoryUsage = useMemoryMonitor();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        padding: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        borderRadius: '5px',
        fontSize: '14px',
      }}
    >
      {memoryUsage !== null
        ? `Memory Usage: ${memoryUsage.toFixed(2)} MB`
        : 'Calculating memory usage...'}
    </div>
  );
};

export default MemoryUsageDisplay;
