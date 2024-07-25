// DebouncedInput.js
import React, { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

const DebouncedInput = ({ onChange }) => {
  const [value, setValue] = useState('');

  // Create a debounced function to handle input changes
  const debouncedOnChange = useCallback(
    debounce((newValue) => {
      onChange(newValue);
    }, 300), // Debounce delay in milliseconds
    [onChange]
  );

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    debouncedOnChange(newValue);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="Search for news"
    />
  );
};

export default DebouncedInput;
