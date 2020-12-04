import React from 'react';
import spinner from '../assets/images/spinner.svg';

const ProgressBar = ({ display, animated, message }) => {
  if (!display) {
    return null;
  }

  const alt = 'Loading data...';

  return (
    <div className='progress-bar'>
      <span className='progress-bar__message'>{message}</span>

      <span className='progress-bar__icon'>
        {animated && <img src={spinner} alt={alt} className='progress-bar__img' />}
      </span>
    </div>
  );
};

export default ProgressBar;
