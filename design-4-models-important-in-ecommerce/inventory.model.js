const { Schema, model } = require('mongoose');

// Inventory model
const inventorySchema = new Schema(
  {
    productId: ObjectId,
    quantity: Number, // 1000 ===> 990
    reservation: Array,
    /*
    [
      {
        userId:123,
        quantity:10
      }
    ]  
    */
  },
  {
    timestamps: true,
  }
);
