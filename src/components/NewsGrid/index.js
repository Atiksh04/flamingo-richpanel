import React from 'react';
import { AutoSizer, Grid } from 'react-virtualized';
import "./styles.css";
import { trackEvents } from '../../utils/tracking';

const NewsGrid = ({ articles, columnWidth, rowHeight }) => {
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    const index = rowIndex * Math.floor(window.innerWidth / columnWidth) + columnIndex;
    if (index >= articles.length) return null; 

    const article = articles[index];
    const truncatedTitle = truncateText(article.title || article.name, 50); // Truncate title to 58 characters
    const truncatedDescription = truncateText(article.description, 150); // Truncate description to 150 characters
    const publishedDate = article?.publishedAt && new Date(article?.publishedAt).toLocaleDateString(); // Format published date

    const handleReadMoreClick = (name)=>{
      trackEvents("article_read_more", {"name": name});
    }

    return (
      <div
        key={key}
        style={style}
        className="p-2 bg-white h-full flex flex-col"
      >
        <div className="h-full flex flex-col justify-between border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex-grow p-2">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{truncatedTitle}</h3>
            <p className="text-gray-600 mb-2 text-sm">{article?.source?.name}</p> 
            <p className="text-gray-500 mb-2 text-xs">{publishedDate}</p>
            <p className="text-gray-700 mb-2">{truncatedDescription}</p>
          </div>
          <a
            href={article.url}
            target="_blank"
            onClick={()=>handleReadMoreClick(truncatedTitle)}
            rel="noopener noreferrer"
            className="text-blue-500 dark:text-blue-400 hover:underline p-2 border-t border-gray-200"
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
