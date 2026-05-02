import * as userService from '../services/user.service.js';

export async function getAll(req, res, next) {
  try {
    const users = await userService.findAll(req.db);
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function getById(req, res, next) {
  try {
    const user = await userService.findById(req.db, req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const user = await userService.updateUser(req.db, req.params.id, req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
}
