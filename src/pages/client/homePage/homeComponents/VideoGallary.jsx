import React from 'react';
import ReactPlayer from 'react-player/lazy';

const videos = [
  'https://www.youtube.com/watch?v=SV1XjGMjL28',
  'https://www.youtube.com/watch?v=fyHxlQCG_vM',
  'https://www.youtube.com/watch?v=__sRaKopsE4',
  'https://www.youtube.com/shorts/A88BnWYjldo',
  'https://www.youtube.com/shorts/gb_kcUGf38g'
];

const VideoGallary = () => {
  return (
    <div className="lg:w-10/12 mx-auto my-8 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((url, index) => (
        <div
          key={index}
          className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 bg-white"
        >
          <div className="aspect-w-16 aspect-h-9">
            <ReactPlayer
              url={url}
              controls
              width="100%"
             
              style={{ borderRadius: '12px' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoGallary;
