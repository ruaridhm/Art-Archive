const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.ts');
// const cloudinary = require('cloudinary').v2;
const { check, validationResult, body } = require('express-validator');

const User = require('../models/User.ts');
const CollectionItem = require('../models/Item.ts');

// @route       GET api/collection
// @desc        Get all users collectionItem
// @access      Private
router.get('/', auth, async (req, res) => {
  try {
    const collectionItems = await CollectionItem.find({
      user: req.user.id,
    }).sort({
      date: -1,
    });
    res.json(collectionItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST api/collection
// @desc        Add new collectionItem
// @access      Private
router.post('/', [auth], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
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
    editions,
    mediaLinks,
    notes,
    exhibitions,
    submissions,
    sales,
    lastEdited,
  } = req.body;

  try {
    const newItem = new CollectionItem({
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
      editions,
      mediaLinks,
      notes,
      exhibitions,
      submissions,
      sales,
      lastEdited,
      user: req.user.id,
    });

    const item = await newItem.save();

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       PUT api/collection:id
// @desc        Update collectionItem
// @access      Private
router.put('/:id', auth, async (req, res) => {
  const {
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
    editions,
    mediaLinks,
    notes,
    exhibitions,
    submissions,
    sales,
    lastEdited,
  } = req.body;

  //Build record object
  const itemFields = {};

  if (title) itemFields.title = title;
  if (artist) itemFields.artist = artist;
  if (reference) itemFields.reference = reference;
  if (collectionName) itemFields.collectionName = collectionName;
  if (image) itemFields.image = image;
  if (date) itemFields.date = date;
  if (size) itemFields.size = size;
  if (medium) itemFields.medium = medium;
  if (price) itemFields.price = price;
  if (currentLocation) itemFields.currentLocation = currentLocation;
  if (editions) itemFields.editions = editions;
  if (mediaLinks) itemFields.mediaLinks = mediaLinks;
  if (notes) itemFields.notes = notes;
  if (exhibitions) itemFields.exhibitions = exhibitions;
  if (submissions) itemFields.submissions = submissions;
  if (sales) itemFields.sales = sales;
  if (lastEdited) itemFields.lastEdited = lastEdited;

  try {
    let collectionItem = await CollectionItem.findById(req.params.id);

    if (!collectionItem) return res.status(404).json({ msg: 'Item not found' });

    //Make sure user owns collectionItem
    if (collectionItem.user.toString() != req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    collectionItem = await CollectionItem.findByIdAndUpdate(
      req.params.id,
      { $set: itemFields },
      { new: true }
    );

    res.json(collectionItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       Delete api/collection:id
// @desc        Delete collectionItem
// @access      Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let collectionItem = await CollectionItem.findById(req.params.id);

    if (!collectionItem) return res.status(404).json({ msg: 'Item not found' });

    //Make sure user owns item
    if (collectionItem.user.toString() != req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await CollectionItem.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Item Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
