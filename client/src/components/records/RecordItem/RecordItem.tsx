import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import RecordContext from '../../../context/record/RecordContext';
import Button from '@material-ui/core/Button';
import Modal from '../../modal/Modal';
import ImageSlider from '../../imageSlider/ImageSlider';
import ViewInfo from '../../viewInfo/ViewInfo';
import ModalPortal from '../../modal/ModalPortal';

//icons
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';

import {
  Card,
  CardTitle,
  CardArtist,
  RecordDetailsListContainer,
  RecordDetailsList,
  RecordImage,
  ButtonContainer,
} from './Style';

export interface RecordInterface {
  _id?: string;
  title?: string;
  artist?: string;
  reference?: string;
  collectionName?: string;
  image?: string;
  date?: Date;
  size?: string;
  medium?: string;
  price?: Number;
  currentLocation?: string;
  mediaLinks?: string;
  notes?: string;
  firstExhibitedDate?: Date;
  firstExhibitedTitle?: string;
  firstExhibitedAddress?: string;
  exhibited?: Array<Object>;
  submission?: Array<Object>;
  salesHistorySoldTo?: string;
  salesHistorySoldBy?: string;
  salesHistoryDateSold?: Date;
}

interface RecordItemProps {
  record: RecordInterface;
  setDisplayAddRecord: Dispatch<SetStateAction<boolean>>;
}

const RecordItem = ({ record, setDisplayAddRecord }: RecordItemProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const recordContext = useContext(RecordContext);
  const { deleteRecord, setCurrent, clearCurrent } = recordContext;

  const closeDeleteModalHandler = () => setShowDeleteModal(false);
  const closeInfoModalHandler = () => setShowInfoModal(false);

  const {
    _id,
    title,
    artist,
    reference,
    collectionName,
    image,
    date,
    size,
    medium,
    price,
    currentLocation,
    mediaLinks,
    notes,
    firstExhibitedDate,
    firstExhibitedTitle,
    firstExhibitedAddress,
    exhibited,
    submission,
    salesHistorySoldTo,
    salesHistorySoldBy,
    salesHistoryDateSold,
  } = record;

  const scrollToTop = () => {
    document.documentElement.scrollTop = 110;
  };

  const onDelete = () => {
    deleteRecord(_id);
    clearCurrent();
  };

  const editRecord = () => {
    setCurrent(record);
    setDisplayAddRecord(true);
    scrollToTop();
  };

  const showInfoModalHandler = () => {
    setShowInfoModal(true);
  };

  const showDeleteModalHandler = () => {
    setShowDeleteModal(true);
  };

  const renderImageSlider = () => {
    return <ImageSlider coverFront={image} />;
  };

  const getFormattedDate = (date) => {
    const dateStr = date.toString();

    return `${dateStr.substring(8, 10)}-${dateStr.substring(
      5,
      7
    )}-${dateStr.substring(0, 4)} `;
  };

  return (
    <>
      <Card className='card'>
        <CardTitle>{title}</CardTitle>
        <CardArtist>{artist}</CardArtist>
        <RecordDetailsListContainer>
          <RecordDetailsList>
            {reference && (
              <li>
                <strong>Ref:</strong> {reference}
              </li>
            )}
            {collectionName && (
              <li>
                <strong>Collection:</strong> {collectionName}
              </li>
            )}
            {date && (
              <li>
                <strong>Date:</strong> {getFormattedDate(date)}
              </li>
            )}
            {size && (
              <li>
                <strong>Size:</strong> {size}
              </li>
            )}
            {medium && (
              <li>
                <strong>Medium:</strong> {medium}
              </li>
            )}
            {price && (
              <li>
                <strong>Price:</strong> {price}
              </li>
            )}
            {currentLocation && (
              <li>
                <strong>Current Location:</strong> {currentLocation}
              </li>
            )}
            {mediaLinks && (
              <li>
                <strong>Media Links:</strong> {mediaLinks}
              </li>
            )}
            {notes && (
              <li>
                <strong>Notes:</strong> {notes}
              </li>
            )}
          </RecordDetailsList>
        </RecordDetailsListContainer>

        <RecordImage>{renderImageSlider()}</RecordImage>

        <ButtonContainer>
          <Button
            onClick={editRecord}
            color='primary'
            variant='contained'
            startIcon={<EditIcon />}
            size='medium'
          >
            Edit
          </Button>

          <Button
            onClick={showInfoModalHandler}
            color='secondary'
            variant='contained'
            startIcon={<InfoIcon />}
          >
            Show Info
          </Button>
        </ButtonContainer>
      </Card>

      {showDeleteModal && (
        <ModalPortal>
          <Modal
            close={closeDeleteModalHandler}
            confirm={onDelete}
            headerText='Confirm Delete'
            bodyText='Are you sure you want to delete this item?'
            confirmText='Delete'
            confirmIcon={<DeleteIcon />}
          />
        </ModalPortal>
      )}

      {showInfoModal && (
        <ModalPortal>
          <Modal
            close={closeInfoModalHandler}
            confirm={() => {}}
            headerText='Record Info'
            bodyText={
              <>
                <ViewInfo
                  title={title}
                  artist={artist}
                  reference={reference}
                  collectionName={collectionName}
                  image={image}
                  // date={date && getFormattedDate(date)}
                  size={size}
                  medium={medium}
                  price={price}
                  currentLocation={currentLocation}
                  mediaLinks={mediaLinks}
                  notes={notes}
                  firstExhibitedDate={firstExhibitedDate}
                  firstExhibitedTitle={firstExhibitedTitle}
                  firstExhibitedAddress={firstExhibitedAddress}
                  exhibited={exhibited}
                  submission={submission}
                  salesHistorySoldTo={salesHistorySoldTo}
                  salesHistorySoldBy={salesHistorySoldBy}
                  salesHistoryDateSold={salesHistoryDateSold}
                />

                <Button
                  variant='contained'
                  onClick={showDeleteModalHandler}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </>
            }
            showCancel={false}
            showConfirm={false}
          />
        </ModalPortal>
      )}
    </>
  );
};

export default RecordItem;
