import React from 'react';
//Carousel
// @ts-ignore
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

const CarouselComponent = ({ images, handleCurrentIndex }) => {
  console.log('images inside', images);
  return (
    <Carousel
      images={images}
      hasThumbnails={false}
      onIndexChange={(e: { curIndex: number }) => {
        handleCurrentIndex(e);
      }}
    />
  );
};

export default CarouselComponent;
