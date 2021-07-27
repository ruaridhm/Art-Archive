import React from 'react';
//Carousel
// @ts-ignore
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

interface CarouselComponentInterface {
  images: { _id?: string; src: string }[];
  handleCurrentIndex?: (e: { curIndex: any }) => void;
}

const CarouselComponent = ({
  images,
  handleCurrentIndex,
}: CarouselComponentInterface) => {
  console.log('images inside', images);
  return (
    <>
      {handleCurrentIndex ? (
        <Carousel
          images={images}
          hasThumbnails={false}
          onIndexChange={(e: { curIndex: number }) => {
            handleCurrentIndex(e);
          }}
        />
      ) : (
        <Carousel images={images} hasThumbnails={false} />
      )}
    </>
  );
};

export default CarouselComponent;
