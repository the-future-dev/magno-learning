import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const CourseCard = ({ title, description, category, price, id }) => {
  const getRandomColor = () => {
    const colors = [
      'bg-blue-500',
      'bg-red-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const bgColorClass = 'bg-gray-900';
  const textColorClass = 'text-gray-100';

  const cardColor = getRandomColor();

  return (
    <Link href={`/courses/${id}`}>
        <div
          className={`p-4 rounded-lg shadow-md ${cardColor} ${textColorClass}`}
        >
          <div className="mb-2">
            <div className="h-40 rounded-md bg-gray-200 flex items-center justify-center">
              <span className="text-white text-4xl font-bold">
                {title ? title[0].toUpperCase() : '?'}
              </span>
            </div>
          </div>
          <p className="text-sm font-semibold mb-2">
            <span
              style={{
                backgroundColor: '#1a202c',
                borderRadius: '0.5rem',
                padding: '0.25rem 0.5rem',
                display: 'inline-block',
                marginBottom: '0.5rem',
              }}
            >
              {category}
            </span>
          </p>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-700">{description}</p>
          <p className="text-gray-600">Category: {category}</p>
          <p className="text-gray-600">Price: ${price}</p>
        </div>
    </Link>
  );
};

CourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default CourseCard;