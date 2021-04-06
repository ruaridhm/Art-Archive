import React from 'react';
import ImageSlider from '../imageSlider/ImageSlider';
import { RecordInterface } from '../records/RecordItem/RecordItem';

import {
  ViewInfoContainer,
  ImageContainer,
  DetailsContainer,
  Stat,
} from './Style';

const ViewInfo = ({
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
}: RecordInterface) => {
  return (
    <ViewInfoContainer>
      <DetailsContainer>
        {title && (
          <Stat>
            <strong>Title: </strong>
            {title}
          </Stat>
        )}
        {artist && (
          <Stat>
            <strong>Artist: </strong>
            {artist}
          </Stat>
        )}
        {reference && (
          <Stat>
            <strong>Ref: </strong>
            {reference}
          </Stat>
        )}
        {collectionName && (
          <Stat>
            <strong>Collection Name: </strong>
            {collectionName}
          </Stat>
        )}
        {date && (
          <Stat>
            <strong>Date: </strong>
            {date}
          </Stat>
        )}
        {size && (
          <Stat>
            <strong>Size: </strong>
            {size}
          </Stat>
        )}
        {medium && (
          <Stat>
            <strong>Medium: </strong>
            {medium}
          </Stat>
        )}
        {price && (
          <Stat>
            <strong>Price: </strong>
            {price}
          </Stat>
        )}
        {currentLocation && (
          <Stat>
            <strong>Current Location: </strong>
            {currentLocation}
          </Stat>
        )}
        {mediaLinks && (
          <Stat>
            <strong>Media Links: </strong>
            {mediaLinks}
          </Stat>
        )}
        {notes && (
          <Stat>
            <strong>Notes: </strong>
            {notes}
          </Stat>
        )}
        {firstExhibitedDate && (
          <Stat>
            <strong>Date First Exhibited: </strong>
            {firstExhibitedDate}
          </Stat>
        )}
        {firstExhibitedTitle && (
          <Stat>
            <strong>First Exhibition Title: </strong>
            {firstExhibitedTitle}
          </Stat>
        )}
        {firstExhibitedAddress && (
          <Stat>
            <strong>First Venue Address: </strong>
            {firstExhibitedAddress}
          </Stat>
        )}
        {exhibited && (
          <Stat>
            <strong>Exhibited: </strong>
            {exhibited}
          </Stat>
        )}
        {submission && (
          <Stat>
            <strong>Submission: </strong>
            {submission}
          </Stat>
        )}
        {salesHistorySoldTo && (
          <Stat>
            <strong>Sold To: </strong>
            {salesHistorySoldTo}
          </Stat>
        )}
        {salesHistorySoldBy && (
          <Stat>
            <strong>Sold By: </strong>
            {salesHistorySoldBy}
          </Stat>
        )}
        {salesHistoryDateSold && (
          <Stat>
            <strong>Date Sold: </strong>
            {salesHistoryDateSold}
          </Stat>
        )}
      </DetailsContainer>
      <ImageContainer>
        <ImageSlider coverFront={image} />
      </ImageContainer>
    </ViewInfoContainer>
  );
};

export default ViewInfo;
