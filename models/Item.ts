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
  reference: {
    type: String,
  },
  collectionName: {
    type: String,
  },
  image: [
    {
      url: { type: String },
    },
  ],
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
  editions: {
    type: Number,
  },
  mediaLinks: [
    {
      mediaTitle: {
        type: String,
      },
      mediaAddress: {
        type: String,
      },
    },
  ],

  notes: {
    type: String,
  },

  exhibitions: [
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

  //Submissions History
  submissions: [
    {
      submissionDate: {
        type: Date,
      },
      submissionTitle: {
        type: String,
      },
      submissionAddress: {
        type: String,
      },
    },
  ],

  //Sales History
  sales: [
    {
      edition: {
        type: Number,
      },
      soldTo: {
        type: String,
      },
      soldBy: {
        type: String,
      },
      soldDate: {
        type: Date,
      },
      sold: {
        type: Boolean,
      },
    },
  ],

  lastEdited: {
    type: Date,
  },
});

module.exports = mongoose.model('collectionItem', ItemSchema);
