import React, { useState, useEffect, useCallback } from 'react';
import { AutoSizer, Grid } from 'react-virtualized';
import { fetchNews } from '../../actions';
import "./styles.css"

const NewsList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('popularity');

  // Fetch news with filter and sort parameters
  const getNews = useCallback(async () => {
    setLoading(true);
    try {
      const newsArticles = await fetchNews({ q: filter, sortBy });
      setArticles(newsArticles);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [filter, sortBy]);

  useEffect(() => {
    getNews();
  }, [getNews]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  // Grid cell renderer
  const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    const index = rowIndex * 3 + columnIndex;
    if (index >= articles.length) return null; // Handle index out of bounds

    const article = articles[index];
    return (
      <div
        key={key}
        style={style}
        className="p-2 bg-white h-full"
      >
        <div className='border p-2 border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow h-full'>

        <h2 className="text-xl font-semibold mb-3">{article.title}</h2>
        <p className="text-gray-700 mb-3">{article.description}</p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Read more
        </a>
        </div>

      </div>
    );
  };

  // Calculate number of columns based on screen width
  const columnWidth = 320; // Set the width of each column
  const rowHeight = 320; // Adjust row height as needed

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      
      {/* Filter and Sort Controls */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Filter by keyword..."
          className="mb-2 md:mb-0 p-2 border border-gray-300 rounded-lg"
        />
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="p-2 border border-gray-300 rounded-lg"
        >
          <option value="popularity">Sort by Popularity</option>
          <option value="publishedAt">Sort by Date</option>
        </select>
      </div>
      <div className='h-[calc(100vh-7rem)] w-full'>
      <AutoSizer>
        {({ height, width }) => (
          <Grid
            cellRenderer={cellRenderer}
            columnCount={Math.floor(width / columnWidth)}
            columnWidth={columnWidth}
            height={height}
            rowCount={Math.ceil(articles.length / Math.floor(width / columnWidth))}
            rowHeight={rowHeight}
            width={width}
          />
        )}
      </AutoSizer>
      </div>
    </div>
  );
};

export default NewsList;

