import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
// import { ImageList } from '@material-ui/core';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

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
    imageListItem: {},
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

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const itemData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function SingleLineImageList({ images, deleteImageHandler }) {
  const classes = useStyles();
  console.log('images', images);

  return (
    <div className={classes.root}>
      <ImageList className={classes.imageList} cols={2.5}>
        {images.map((item, count) => (
          <ImageListItem key={item.url} className={classes.imageListItem}>
            <img src={item.thumbnail} alt={count} />
            <ImageListItemBar
              classes={{
                root: classes.titleBar,
              }}
              actionIcon={
                <IconButton
                  aria-label='delete'
                  className={classes.button}
                  onClick={() => {
                    deleteImageHandler(item, count);
                  }}
                >
                  <DeleteIcon className={classes.title} />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
