import * as orderService from './order.service.js';

export async function getAll(req, res, next) {
  try {
    const orders = await orderService.findAll(req.db, req.user);
    res.json(orders);
  } catch (err) {
    next(err);
  }
}

export async function getById(req, res, next) {
  try {
    const order = await orderService.findById(req.db, req.params.id, req.user);
    res.json(order);
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const order = await orderService.create(req.db, req.body, req.user);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
}

export async function updateStatus(req, res, next) {
  try {
    const { status } = req.body;
    const order = await orderService.updateStatus(req.db, req.params.id, status);
    res.json(order);
  } catch (err) {
    next(err);
  }
}
