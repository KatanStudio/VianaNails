import { getProductModel } from './product.model.js';

export async function findAll(db, filters = {}) {
  const Product = getProductModel(db);
  const query = { isActive: true, ...filters };
  return Product.find(query);
}

export async function findById(db, id) {
  const Product = getProductModel(db);
  const product = await Product.findById(id);
  if (!product) {
    const err = new Error('Producto no encontrado');
    err.status = 404;
    throw err;
  }
  return product;
}

export async function create(db, data) {
  const Product = getProductModel(db);
  return Product.create(data);
}

export async function update(db, id, data) {
  const Product = getProductModel(db);
  const product = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    const err = new Error('Producto no encontrado');
    err.status = 404;
    throw err;
  }
  return product;
}

export async function softDelete(db, id) {
  const Product = getProductModel(db);
  const product = await Product.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );
  if (!product) {
    const err = new Error('Producto no encontrado');
    err.status = 404;
    throw err;
  }
  return product;
}
