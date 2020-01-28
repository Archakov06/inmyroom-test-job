import React from 'react';
import starImg from '../assets/star.png';

interface IStarsProps {
  count?: number;
}

const Stars: React.FC<IStarsProps> = ({ count }) => {
  return (
    <div className="stars">
      {Array(count)
        .fill(count)
        .map((_, key) => (
          <img key={key} src={starImg} alt="Start" />
        ))}
    </div>
  );
};

Stars.defaultProps = {
  count: 5,
};

export default Stars;
