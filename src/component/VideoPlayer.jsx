import React from 'react';

const VideoPlayer = ({ src, width = '900', height = '650' }) => {
  return (
    <div>
      <video width={width} height={height} controls className='rounded-xl'>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;