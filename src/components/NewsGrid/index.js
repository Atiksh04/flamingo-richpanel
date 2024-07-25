import React from 'react';
import { AutoSizer, Grid } from 'react-virtualized';
import "./styles.css";

const NewsGrid = ({ articles, columnWidth, rowHeight }) => {
//   const columnWidth = 320; // Set the width of each column
//   const rowHeight = 320; // Adjust row height as needed

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
  
  const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    const index = rowIndex * Math.floor(window.innerWidth / columnWidth) + columnIndex;
    if (index >= articles.length) return null; // Handle index out of bounds
  
    const article = articles[index];
    const truncatedDescription = truncateText(article.description, 150); // Truncate description to 100 characters
  
    return (
      <div
        key={key}
        style={style}
        className="p-2 bg-white h-full"
      >
        <div className="h-full p-2 border border-gray-200 rounded-lg  shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{truncateText(article.name || article.title, 58)}</h3>
          <p className="text-gray-700 mb-2">{truncatedDescription}</p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 dark:text-blue-400 hover:underline"
          >
            Read more
          </a>
        </div>
      </div>
    );
  };

  
  return (
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
  );
};

export default NewsGrid;
