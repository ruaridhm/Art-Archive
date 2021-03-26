const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  title: {
    type: String,
  },
  artist: {
    type: String,
    default: 'Ed Miliano',
  },
  ref: {
    type: String,
  },
  collectionName: {
    type: String,
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
  },
  size: {
    type: String,
  },
  medium: {
    type: String,
  },
  price: {
    type: Number,
  },
  currentLocation: {
    type: String,
  },
  mediaLinks: [
    {
      type: String,
    },
  ],
  notes: {
    type: String,
  },

  //Exhibition History
  firstDateExhibited: {
    type: Date,
  },
  firstExhibitionTitle: {
    type: String,
  },
  firstVenueAddress: {
    type: String,
  },
  exhibited: [
    {
      exhibitionDate: {
        type: Date,
      },
      exhibitionTitle: {
        type: String,
      },
      exhibitionAddress: {
        type: String,
      },
    },
  ],

  //Submission History
  submission: [
    {
      submissionDate: {
        type: Date,
      },
      submissionExhibitionTitle: {
        type: String,
      },
      submissionVenueAddress: {
        type: String,
      },
    },
  ],

  //Sales History
  salesHistorySoldTo: {
    type: String,
  },
  salesHistorySoldBy: {
    type: String,
  },
  salesHistoryDateSold: {
    type: Date,
  },
});

module.exports = mongoose.model('collectionItem', ItemSchema);

//TODO if marked as sold , display sold icon (red circle) in TR corner of Primary info(top right box)
