import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">404</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Sorry, the page you're looking for cannot be found.
        </p>
        <Link
          to="/"
          className="text-blue-500 dark:text-blue-400 hover:underline"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
