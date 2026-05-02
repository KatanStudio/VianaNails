import mongoose from 'mongoose';

const variationSchema = new mongoose.Schema(
  {
    legacyId: { type: Number },
    tipo: { type: String, enum: ['Reservar', 'Comprar'] },
    kit: { type: String, enum: ['Con Kit', 'Sin Kit'] },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    legacyId: { type: Number },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    type: { type: String, required: true, enum: ['presencial', 'online'] },
    name: { type: String, required: true, trim: true },
    shortDesc: { type: String, trim: true },
    description: { type: String, trim: true },
    priceFrom: { type: Number, required: true, min: 0 },
    priceTo: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    badge: { type: String, trim: true, default: null },
    image: { type: String, trim: true },
    variations: { type: [variationSchema], default: [] },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

courseSchema.index({ type: 1 });
courseSchema.index({ isActive: 1 });

courseSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

export function getCourseModel(conn) {
  return conn.models.Course ?? conn.model('Course', courseSchema);
}
