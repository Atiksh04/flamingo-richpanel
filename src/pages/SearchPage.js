import React, { useState, useEffect, useCallback } from 'react';
import { fetchNews } from '../actions/index';
import Spinner from '../components/Spinner';
import NewsGrid from '../components/NewsGrid';
import debounce from 'lodash.debounce';
import MemoryUsageDisplay from '../components/MemoryUsage';
import { trackEvents } from '../utils/tracking';
import useIsMobile from '../hooks/useIsMobile';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('popularity');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0); 
  const {isMobile, windowWidth} = useIsMobile();

  // Fetch news data function
  const fetchNewsData = async (pageNum = 1, query, sortBy = "popularity") => {
    if (!query) return;

    setLoading(true);
    setArticles([]);
    try {
      const { articles, totalResults: total } = await fetchNews({ q: query, sortBy, page: pageNum, pageSize: 20 });
        setArticles(articles);
      

      trackEvents("fetching_details",{"text": query});
      setTotalResults(total);
      setTotalPages(Math.ceil(total / 20)); 
      setHasMore(pageNum < totalPages); 
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Debounced fetch function using lodash
  const debouncedFetchNewsData = useCallback(debounce(fetchNewsData, 300), []);

  // Fetch news data on query or sort change
  useEffect(() => {
    debouncedFetchNewsData(1, query, sortBy); 
  }, [query, sortBy, debouncedFetchNewsData]);

  const loadMoreRows = useCallback(() => {
    if (hasMore && !loading) {
      setPage(prevPage => {
        const newPage = prevPage + 1;
        debouncedFetchNewsData(newPage, query, sortBy);
        return newPage;
      });
    }
  }, [hasMore, loading, debouncedFetchNewsData, query, sortBy]);

  const isRowLoaded = ({ index }) => !!articles[index];

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setArticles([]); 
    setPage(1); 
    debouncedFetchNewsData(1, query, sortBy); 
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      trackEvents("page_changed",{"currentPageNo": newPage});
      debouncedFetchNewsData(newPage, query, sortBy);
    }
  };

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">News App</h1>

      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Search News</h3>

      <form onSubmit={handleSearchSubmit} className="mb-4 flex items-center">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search for news..."
          className="p-2 border rounded-lg flex-grow"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-lg ml-2"
        >
          Search
        </button>
      </form>

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
      {!loading && !error && articles.length === 0 ? (
        <div>Search for news</div>
      ) : (
        <>
          <NewsGrid
            articles={articles}
            columnWidth={isMobile ? windowWidth : 311}
            rowHeight={320}
            loadMoreRows={loadMoreRows}
            isRowLoaded={isRowLoaded}
            rowCount={totalResults}
          />
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="p-2 bg-blue-500 text-white rounded-lg mx-2"
            >
              Previous
            </button>
            <span className="p-2">{`Page ${page} of ${totalPages}`}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="p-2 bg-blue-500 text-white rounded-lg mx-2"
            >
              Next
            </button>
          </div>
        </>
      )}

      <MemoryUsageDisplay />
    </div>
  );
};

export default SearchPage;
