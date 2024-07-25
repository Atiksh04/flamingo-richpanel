import React, { useState, useEffect, useCallback } from 'react';
import { fetchNews } from '../actions/index';
import Spinner from '../components/Spinner';
import NewsGrid from '../components/NewsGrid';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('popularity');

  const fetchNewsData = useCallback(async () => {
    if (!query) return;

    setLoading(true);
    try {
      const data = await fetchNews({ q: query, sortBy });
      setArticles(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [query, sortBy]);

  useEffect(() => {
    fetchNewsData();
  }, [fetchNewsData]);

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchNewsData();
  };

  console.log("articles lenght", articles.length)
  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Search News</h1>

      {/* Search Form */}
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search for news..."
          className="p-2 border rounded-lg w-full"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-lg mt-2"
        >
          Search
        </button>
      </form>

      {/* Sorting Options */}
      <div className="mb-4">
        <label className="mr-2">Sort by:</label>
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="p-2 border rounded-lg"
        >
          <option value="popularity">Popularity</option>
          <option value="publishedAt">Date</option>
        </select>
      </div>

      {loading && <Spinner />}
      {error && <div className="text-center py-4 text-red-500">{error}</div>}
      {!loading && !error && articles.length === 0 ? 
        <div>Search for news</div>
      :
      <NewsGrid articles={articles} columnWidth={311} rowHeight={270} />}
    </div>
  );
};

export default SearchPage;
