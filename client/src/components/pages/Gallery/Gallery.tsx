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
import { Button, Box, Portal, Container } from '@material-ui/core';
//Material-UI Icons
import InfoIcon from '@material-ui/icons/Info';
import { RecordInterface } from '../../records/RecordItem/RecordItem';
import CarouselComponent from './CarouselComponent';
//https://github.com/yifaneye/react-gallery-carousel
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: 'calc(100vh - 64px)',
    },
  })
);
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
  const classes = useStyles();

  useEffect(() => {
    authContext.loadUser();
    getRecords();

    //   // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (records) {
      console.log(records);
      records.forEach((record) => {
        if (record.image!.length >= 1 && record.image![0].url !== '') {
          setCarouselImages((prevState: carouselImagesStateInterface[]) => [
            ...prevState,
            { src: record.image![0].url, _id: record._id },
          ]);
        }
      });
    }
    setRenderReady(true);
    // eslint-disable-line
  }, [records]);

  useEffect(() => {
    if (carouselImages.length >= 1) {
      setFoundRecord(
        records?.find((element) => element._id === carouselImages[0]._id)
      );
    }
  }, [carouselImages]);

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
        <Container
          disableGutters={true}
          maxWidth={false}
          className={classes.container}
        >
          {carouselImages.length === 0 ? (
            <Box display='flex' justifyContent='center'>
              <h2>No images found.</h2>
            </Box>
          ) : (
            <>
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
                bottom='10px'
                textAlign='center'
              >
                {foundRecord && (
                  <Button
                    variant='contained'
                    color='primary'
                    startIcon={<InfoIcon />}
                    onClick={handleShowDialog}
                  >
                    Info
                  </Button>
                )}
              </Box>
            </>
          )}
        </Container>
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
