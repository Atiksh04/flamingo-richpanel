import React, { useState, useEffect, useCallback } from 'react';
import { fetchTopHeadlines } from '../actions/index';
import Spinner from '../components/Spinner';
import NewsGrid from '../components/NewsGrid';
import { useQuery } from '../hooks/useQuery'; // Custom hook for query params
import MemoryUsageDisplay from '../components/MemoryUsage';
import useIsMobile from '../hooks/useIsMobile';

const CategoryPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const query = useQuery();
  const category = query.get('category') || 'general';
  const {isMobile, windowWidth} = useIsMobile();

  const fetchCategoryData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchTopHeadlines({ category });
      setArticles(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchCategoryData();
  }, [fetchCategoryData]);

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">
        News App
      </h1>

      <h3 className="text-2xl font-bold mb-4 text-gray-900">
        {category.charAt(0).toUpperCase() + category.slice(1)} News
      </h3>

      {/* show category news */}
      {loading && <Spinner />}
      {error && <div className="text-center py-4 text-red-500">{error}</div>}
      {!loading && !error && <NewsGrid articles={articles} columnWidth={isMobile ? windowWidth : 311} rowHeight={240} />}

      <MemoryUsageDisplay/>
    </div>
  );
};

export default CategoryPage;
