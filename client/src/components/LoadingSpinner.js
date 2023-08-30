import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-75 h-16 w-16"></div>
    </div>
  );
};

export default LoadingSpinner;
