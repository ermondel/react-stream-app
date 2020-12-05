import React from 'react';
import img from '../assets/images/spinner.svg';

const ProgressBar = ({ status }) => {
  let message;
  let spinner;

  switch (status) {
    case 'request':
      message = 'Request to the media server ';
      spinner = true;
      break;

    case 'notice':
      message = 'The media server is not responding.';
      spinner = false;
      break;

    default:
      return null;
  }

  const alt = 'Loading data...';

  return (
    <div className='progress-bar'>
      <span className='progress-bar__message'>{message}</span>

      <span className='progress-bar__icon'>
        {spinner && <img src={img} alt={alt} className='progress-bar__img' />}
      </span>
    </div>
  );
};

export default ProgressBar;
