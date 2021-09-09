const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.ts');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

router.delete('/:public_Id', auth, async (req, res) => {
  console.log('single called in routes!');
  try {
    await cloudinary.uploader.destroy(req.params.public_Id);
    res.json({ msg: 'Image Removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.delete('/bulk/:public_Id_Arr', auth, async (req, res) => {
  console.log('bulk called in routes!');
  console.log('req.params.public_Id_Arr', req.params.public_Id_Arr);
  try {
    //remove v2? install admin api?
    await cloudinary.api.delete_resources(
      ['sld0tteebwidy0oitiwk', 'lsljz8haodb9zea243ed'],
      //delete next line? needed?
      function (error, result) {
        console.log(result, error);
      }
    );
    res.json({ msg: 'Images Removed' });
  } catch (err) {
    console.log('catch', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
