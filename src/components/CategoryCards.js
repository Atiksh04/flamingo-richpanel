import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { trackEvents } from '../utils/tracking';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    trackEvents("open_category",{"category": category.name});

    navigate(`/news?category=${category.name.toLowerCase()}`);
  };

  return (
    <div
      className="border p-4 rounded-lg shadow-sm bg-white dark:bg-gray-800 cursor-pointer"
      onClick={handleClick}
    >
      <img 
        src={category.image} 
        alt={category.name} 
        className="w-full h-40 object-cover rounded-t-lg" 
        loading="lazy" 
      />
      <h3 className="text-lg font-semibold mt-2 text-gray-900 dark:text-gray-100">{category.name}</h3>
    </div>
  );
};

CategoryCard.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryCard;
