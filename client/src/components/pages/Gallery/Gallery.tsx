import React, { useEffect, useContext, useState } from 'react';
//Context
import AuthContext from '../../../context/auth/AuthContext';
import RecordContext from '../../../context/record/RecordContext';
//Carousel
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
//Custom Components
import Spinner from '../../layout/Spinner/Spinner';
import RecordItemDialog from '../../records/RecordItem/RecordItemDialog';
//Material UI Components
import { Button, Box, Portal } from '@material-ui/core';
//Material-UI Icons
import InfoIcon from '@material-ui/icons/Info';
//https://github.com/yifaneye/react-gallery-carousel

const Gallery = () => {
  const authContext = useContext(AuthContext);
  const recordContext = useContext(RecordContext);
  const { getRecords, records } = recordContext;
  const [carouselImages, setCarouselImages] = useState([]);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [foundRecord, setFoundRecord] = useState(null);

  useEffect(() => {
    authContext.loadUser();
    getRecords();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    records &&
      records.forEach((element) => {
        if (element.image[0].url !== '') {
          if (
            carouselImages.find((item) => item._id === element._id) ===
            undefined
          )
            setCarouselImages([
              ...carouselImages,
              { src: element.image[0].url, _id: element._id },
            ]);
        }
      });
    carouselImages.length >= 1 &&
      setFoundRecord(
        records.find((element) => element._id === carouselImages[0]._id)
      );
  }, [carouselImages, records]);

  const handleShowDialog = () => {
    console.log('handleShowDialog');
    setShowInfoDialog(!showInfoDialog);
  };

  const handleCurrentIndex = (e: { curIndex: any }) => {
    setFoundRecord(
      records.find((element) => element._id === carouselImages[e.curIndex]._id)
    );
  };

  return (
    <>
      {carouselImages.length !== 0 ? (
        <Box height='89.99vh'>
          <Carousel
            images={carouselImages}
            hasThumbnails={false}
            onIndexChange={(e: { curIndex: number }) => {
              handleCurrentIndex(e);
            }}
          />
          <Box
            position='absolute'
            marginLeft='auto'
            marginRight='auto'
            left={0}
            right={0}
            bottom={0}
            textAlign='center'
          >
            <Button
              variant='contained'
              color='primary'
              startIcon={<InfoIcon />}
              onClick={handleShowDialog}
            >
              Info
            </Button>
          </Box>
        </Box>
      ) : (
        <Spinner description='Loading Gallery' />
      )}
      {showInfoDialog && foundRecord !== null ? (
        <Portal>
          <RecordItemDialog
            record={foundRecord}
            open={showInfoDialog}
            setOpen={setShowInfoDialog}
          />
        </Portal>
      ) : null}
    </>
  );
};

export default Gallery;
