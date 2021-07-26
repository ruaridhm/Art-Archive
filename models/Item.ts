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
      title: {
        type: String,
      },
      address: {
        type: String,
      },
    },
  ],

  notes: {
    type: String,
  },

  exhibitions: [
    {
      date: {
        type: Date,
      },
      title: {
        type: String,
      },
      address: {
        type: String,
      },
    },
  ],

  //Submissions History
  submissions: [
    {
      date: {
        type: Date,
      },
      title: {
        type: String,
      },
      address: {
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
