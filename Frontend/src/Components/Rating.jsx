import React, { useState } from 'react';
import Star from './Star';

const Rating = ({ onRate }) => {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(0);
  };

  const handleClick = (index) => {
    setSelected(index);
    if (onRate) {
      onRate(index);
    }
  };

  return (
    <div className="rating-container flex gap-2">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          filled={index < (hovered || selected)}
          onMouseEnter={() => handleMouseEnter(index + 1)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index + 1)}
        />
      ))}
    </div>
  );
};

export default Rating;
