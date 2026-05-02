import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    priceAtOrder: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, unique: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: { type: [orderItemSchema], required: true, validate: (v) => v.length > 0 },
    status: {
      type: String,
      enum: ['pendiente', 'en_proceso', 'completado', 'cancelado'],
      default: 'pendiente',
    },
    paymentStatus: {
      type: String,
      enum: ['pendiente', 'pagado', 'reembolsado'],
      default: 'pendiente',
    },
    paymentMethod: {
      type: String,
      enum: ['efectivo', 'tarjeta', 'transferencia', 'otro'],
      required: true,
    },
    totalAmount: { type: Number, min: 0 },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

orderSchema.index({ client: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

orderSchema.pre('save', function (next) {
  if (this.isNew && !this.orderNumber) {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const suffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    this.orderNumber = `ORD-${dateStr}-${suffix}`;
  }

  this.totalAmount = this.items.reduce(
    (sum, item) => sum + item.priceAtOrder * item.quantity,
    0
  );

  next();
});

orderSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

export function getOrderModel(conn) {
  return conn.models.Order ?? conn.model('Order', orderSchema);
}
