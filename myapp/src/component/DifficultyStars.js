import React from 'react'
import StarRatings from 'react-star-ratings';

const DifficultyStars = ({level}) => {
  return (
    <StarRatings numberOfStars={3} rating={{ easy: 1, medium: 2, hard: 3 }[level]} />
  );
}

export default DifficultyStars;