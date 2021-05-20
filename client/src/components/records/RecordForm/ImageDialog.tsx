import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { DropzoneDialogBase } from 'material-ui-dropzone';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const ImageDialog = () => {
  const [open, setOpen] = useState(false);
  const [fileObjects, setFileObjects] = useState([]);

  useEffect(() => {
    console.log(fileObjects);
  }, [fileObjects]);

  const dialogTitle = () => (
    <>
      <span>Upload file</span>
      <IconButton
        style={{ right: '12px', top: '8px', position: 'absolute' }}
        onClick={() => setOpen(false)}
      >
        <CloseIcon />
      </IconButton>
    </>
  );
  return (
    <div>
      <Button variant='contained' color='primary' onClick={() => setOpen(true)}>
        Add Images
      </Button>

      <DropzoneDialogBase
        dialogTitle={dialogTitle()}
        acceptedFiles={['image/*']}
        fileObjects={fileObjects}
        cancelButtonText={'cancel'}
        submitButtonText={'submit'}
        maxFileSize={5000000} //Aprox. 5Mb
        open={open}
        onAdd={(newFileObjs) => {
          console.log('onAdd', newFileObjs);
          setFileObjects([].concat(fileObjects, newFileObjs));
        }}
        onDelete={(deleteFileObj) => {
          console.log('onDelete', deleteFileObj);
        }}
        onClose={() => setOpen(false)}
        onSave={() => {
          console.log('onSave', fileObjects);
          setOpen(false);
        }}
        showPreviews={true}
        showFileNamesInPreview={true}
      />
    </div>
  );
};

export default ImageDialog;
