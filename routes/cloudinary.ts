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
  try {
    await cloudinary.uploader.destroy(req.params.public_Id);
    res.json({ msg: 'Image Removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.delete('/bulk/:public_Ids', auth, async (req, res) => {
  const idArr = req.params.public_Ids.split(',');
  try {
    await cloudinary.api.delete_resources(idArr, function (error, result) {
      console.error(result, error);
    });
    res.json({ msg: 'Images Removed' });
  } catch (err) {
    console.log('catch', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
