import React, { useState, useEffect, useCallback } from "react";
import CategoryCard from "../components/CategoryCards";
import { Link } from "react-router-dom";
import { fetchTopHeadlines } from "../actions/index";
import { CATEGORIES } from "../utils/constants";
import Spinner from "../components/Spinner/index";
import NewsGrid from "../components/NewsGrid"; // Import the new component
import MemoryUsageDisplay from "../components/MemoryUsage";
import useIsMobile from "../hooks/useIsMobile";

const HomePage = () => {
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {isMobile, windowWidth} = useIsMobile();


  const fetchHeadlines = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchTopHeadlines({
        category: "general",
      });
      setHeadlines(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHeadlines();
  }, [fetchHeadlines]);


  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        News App
      </h1>

      <div className="mb-4 w-full flex justify-end">
        <div className="w-[35%]">

        <Link to="/search">
          <button className="p-2 bg-blue-500 text-white rounded-lg w-full">
            Search News
          </button>
        </Link>
        </div>

      </div>

      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Top Categories</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-8">
        {CATEGORIES.map((cat) => (
          <CategoryCard key={cat.name} category={cat} />
        ))}
      </div>

      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Top Headlines
      </h3>

      {loading && <Spinner />}
      {error && <div className="text-center py-4 text-red-500">{error}</div>}

      {!error && !loading && (
        <NewsGrid articles={headlines} columnWidth={isMobile ? (windowWidth) : 311} rowHeight={240} />
      )}

      <MemoryUsageDisplay/>
    </div>
  );
};

export default HomePage;
