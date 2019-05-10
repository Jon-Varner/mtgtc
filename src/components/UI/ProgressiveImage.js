import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const ProgressiveImage = memo(({ src, preview, alt }) => {
  const [image, setImage] = useState(preview);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImage(src);
  });

  const loadImage = src => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImage(img.src);
      setLoading(false);
    };
  };

  const styleImage = loading => {
    return {
      transition: '0.5s filter linear',
      filter: `${loading ? 'blur(50px' : ''}`
    };
  };

  return <img style={styleImage(loading)} src={image} alt={alt} />;
});

ProgressiveImage.propTypes = {
  preview: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};
