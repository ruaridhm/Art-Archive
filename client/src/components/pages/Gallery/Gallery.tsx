import React, { useEffect, useContext, useState } from 'react';
//Context
import AuthContext from '../../../context/auth/AuthContext';
import RecordContext from '../../../context/record/RecordContext';
//Carousel
// @ts-ignore
import 'react-gallery-carousel/dist/index.css';
//Custom Components
import Spinner from '../../layout/Spinner/Spinner';
import RecordItemDialog from '../../records/RecordItem/RecordItemDialog';
//Material UI Components
import { Button, Box, Portal } from '@material-ui/core';
//Material-UI Icons
import InfoIcon from '@material-ui/icons/Info';
import { RecordInterface } from '../../records/RecordItem/RecordItem';
import CarouselComponent from './CarouselComponent';
//https://github.com/yifaneye/react-gallery-carousel

interface carouselImagesStateInterface {
  src: string;
  _id: string;
}

const Gallery = () => {
  const authContext = useContext(AuthContext);
  const recordContext = useContext(RecordContext);
  const { getRecords, records } = recordContext;
  const [carouselImages, setCarouselImages] = useState<any[]>([]);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [foundRecord, setFoundRecord] = useState<RecordInterface>();
  const [renderReady, setRenderReady] = useState(false);
  useEffect(() => {
    authContext.loadUser();
    getRecords();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    records &&
      records.forEach((record) => {
        if (record.image![0].url !== '') {
          setCarouselImages((prevState: carouselImagesStateInterface[]) => [
            ...prevState,
            { src: record.image![0].url, _id: record._id },
          ]);
        }
      });
    setRenderReady(true);
    // eslint-disable-line
  }, [records]);

  const handleShowDialog = () => {
    setShowInfoDialog(!showInfoDialog);
  };

  const handleCurrentIndex = (e: { curIndex: any }) => {
    setFoundRecord(
      records?.find((element) => element._id === carouselImages[e.curIndex]._id)
    );
  };

  return (
    <>
      {renderReady ? (
        <Box height='90%'>
          <CarouselComponent
            images={carouselImages}
            handleCurrentIndex={handleCurrentIndex}
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
            record={foundRecord!}
            open={showInfoDialog}
            setOpen={setShowInfoDialog}
          />
        </Portal>
      ) : null}
    </>
  );
};

export default Gallery;
