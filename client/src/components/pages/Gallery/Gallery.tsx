import React, { useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/Info';
import AuthContext from '../../../context/auth/AuthContext';
import RecordContext from '../../../context/record/RecordContext';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import { GalleryContainer, ButtonContainer } from './Style';

//https://github.com/yifaneye/react-gallery-carousel

const Gallery = () => {
  const authContext = useContext(AuthContext);
  const recordContext = useContext(RecordContext);
  const { getRecords, loading } = recordContext;

  useEffect(() => {
    authContext.loadUser();
    getRecords();

    // eslint-disable-next-line
  }, []);

  const images = [900, 800, 700, 600, 500].map((size) => ({
    src: `https://placedog.net/${size}/${size}`,
  }));

  return (
    !loading && (
      <GalleryContainer>
        <Carousel images={images} hasThumbnails={false} />
        <ButtonContainer>
          <Button variant='contained' color='primary' startIcon={<InfoIcon />}>
            Info
          </Button>
        </ButtonContainer>
      </GalleryContainer>
    )
  );
};

export default Gallery;
