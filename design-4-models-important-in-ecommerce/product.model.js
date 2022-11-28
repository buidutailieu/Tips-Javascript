const { Schema, model } = require('mongoose');

// Product model
const productSchema = new Schema(
  {
    code: String,
    name: String,
    brand: String,
    description: String,
    comments: Array,
    specs: Array,
  },
  {
    timestamps: true,
  }
);

productSchema.createIndexes({ 'specs.k': 1, 'specs.v': 1 });

const products = [
  {
    _id: 1,
    code: 'CAMERA-001',
    name: 'X820',
    brand: 'Cannon',
    description: 'The camera with the higest resolution',
    weight_g: 365,
    comments: [
      {
        userId: 123,
        comment: 'Good product',
      },
    ],
    specs: [
      {
        k: 'resolution_mp',
        v: 36,
        u: 'mp',
      },
      {
        k: 'technology',
        v: 'ANS-3000',
      },
      { k: 'height', v: 90 },
    ],
  },
  {
    _id: 2,
    code: 'NGK-12345',
    name: 'Nha gia kim',
    brand: 'Amazon',
    description: 'A book with everything around the world',
    weight_g: 365,
    comments: [
      {
        userId: 123,
        comment: 'Good product',
      },
    ],
    specs: [
      {
        k: 'author',
        v: 'Paulo Debala',
      },
      {
        k: 'editor',
        v: 'Amazon',
      },
      { k: 'pages', v: 100 },
    ],
  },
];
