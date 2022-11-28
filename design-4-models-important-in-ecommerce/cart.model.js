const { Schema, model } = require('mongoose');

// Cart model
const cartSchema = new Schema(
  {
    userId: ObjectId,
    status: {
      type: String,
      default: 'active',
    },
    products: Array,
    /*
    [
      {
        productId:123,
        quantity:12
      }
    ]
    */
  },
  {
    timestamps: true,
  }
);