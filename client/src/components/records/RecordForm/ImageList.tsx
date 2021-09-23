import React from 'react';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { ImgInterface } from '../RecordItem/RecordItemDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    imageList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    imageListItem: {
      minWidth: 117,
    },
    button: {
      '&:hover': { opacity: 0.8 },
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  })
);

interface SingleLineImageListInterface {
  images: ImgInterface[];
  handleDeleteImage: (imageIndex: number) => Promise<void>;
}

const SingleLineImageList = ({
  images,
  handleDeleteImage,
}: SingleLineImageListInterface) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageList className={classes.imageList} cols={2.5}>
        {images.map((item, imageIndex: number) => (
          <ImageListItem key={item.url} className={classes.imageListItem}>
            <img src={item.thumbnail} alt={imageIndex.toString()} />
            <ImageListItemBar
              classes={{
                root: classes.titleBar,
              }}
              actionIcon={
                <IconButton
                  aria-label='delete'
                  className={classes.button}
                  onClick={() => {
                    handleDeleteImage(imageIndex);
                  }}
                  size="large">
                  <DeleteIcon className={classes.title} />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default SingleLineImageList;
