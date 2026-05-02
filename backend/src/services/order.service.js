import { getOrderModel } from '../models/order.model.js';

export async function findAll(db, callerUser) {
  const Order = getOrderModel(db);
  const query = callerUser.role === 'admin' ? {} : { client: callerUser.sub };
  return Order.find(query)
    .populate('client', 'name email')
    .populate('createdBy', 'name')
    .sort({ createdAt: -1 });
}

export async function findById(db, id, callerUser) {
  const Order = getOrderModel(db);
  const order = await Order.findById(id)
    .populate('client', 'name email phone')
    .populate('createdBy', 'name')
    .populate('items.product', 'name sku');

  if (!order) {
    const err = new Error('Pedido no encontrado');
    err.status = 404;
    throw err;
  }

  const isOwner = order.client._id.toString() === callerUser.sub;
  const hasAccess = ['admin', 'empleado'].includes(callerUser.role) || isOwner;

  if (!hasAccess) {
    const err = new Error('Permisos insuficientes');
    err.status = 403;
    throw err;
  }

  return order;
}

export async function create(db, data, callerUser) {
  const Order = getOrderModel(db);
  return Order.create({ ...data, createdBy: callerUser.sub });
}

export async function updateStatus(db, id, status) {
  const Order = getOrderModel(db);
  const order = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );
  if (!order) {
    const err = new Error('Pedido no encontrado');
    err.status = 404;
    throw err;
  }
  return order;
}
