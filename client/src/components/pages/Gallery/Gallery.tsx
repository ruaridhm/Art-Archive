import React, { useEffect, useContext } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import Button from '../../button/Button';
import AuthContext from '../../../context/auth/AuthContext';
import RecordContext from '../../../context/record/RecordContext';

const Gallery = () => {
  const authContext = useContext(AuthContext);
  const recordContext = useContext(RecordContext);
  const { getRecords, loading } = recordContext;

  useEffect(() => {
    authContext.loadUser();
    getRecords();

    // eslint-disable-next-line
  }, []);
  return (
    <>
      <AwesomeSlider
        animation='cubeAnimation'
        customContent={<Button type='button' label='Info' solidPlain medium />}
      >
        <div data-src='/path/to/image-0.png' />
        <div data-src='/path/to/image-1.png' />
        <div data-src='/path/to/image-2.jpg' />
      </AwesomeSlider>
    </>
  );
};

export default Gallery;
