import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['esmalte', 'gel', 'acrílico', 'herramienta', 'accesorio', 'otro'],
    },
    brand: { type: String, trim: true },
    sku: { type: String, required: true, unique: true, trim: true, uppercase: true },
    price: {
      cost: { type: Number, required: true, min: 0 },
      sale: { type: Number, required: true, min: 0 },
    },
    stock: {
      current: { type: Number, required: true, default: 0, min: 0 },
      minimum: { type: Number, default: 0, min: 0 },
      unit: { type: String, default: 'ud', trim: true },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

productSchema.index({ category: 1 });
productSchema.index({ isActive: 1 });

productSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

export function getProductModel(conn) {
  return conn.models.Product ?? conn.model('Product', productSchema);
}
