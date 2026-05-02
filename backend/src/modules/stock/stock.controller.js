import * as stockService from './stock.service.js';

export async function getAll(req, res, next) {
  try {
    const { category } = req.query;
    const filters = category ? { category } : {};
    const products = await stockService.findAll(req.db, filters);
    res.json(products);
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const product = await stockService.create(req.db, req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const product = await stockService.update(req.db, req.params.id, req.body);
    res.json(product);
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    await stockService.softDelete(req.db, req.params.id);
    res.json({ message: 'Producto desactivado correctamente' });
  } catch (err) {
    next(err);
  }
}
