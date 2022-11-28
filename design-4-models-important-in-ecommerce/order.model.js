const { Schema, model } = require('mongoose');

// Order model
const orderSchema = new Schema(
  {
    cartId: ObjectId,
    userId: ObjectId,
    shipping: Object,
    payment: Object,
    products: Array,
  },
  {
    timestamps: true,
  }
);
