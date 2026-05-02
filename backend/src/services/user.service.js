import { getUserModel } from '../models/user.model.js';

export async function findAll(db) {
  const User = getUserModel(db);
  return User.find({ isActive: true }).select('-password');
}

export async function findById(db, id) {
  const User = getUserModel(db);
  const user = await User.findById(id).select('-password');
  if (!user) {
    const err = new Error('Usuario no encontrado');
    err.status = 404;
    throw err;
  }
  return user;
}

export async function updateUser(db, id, data) {
  const User = getUserModel(db);
  const { password, tokenVersion, ...safeData } = data;

  const user = await User.findByIdAndUpdate(id, safeData, {
    new: true,
    runValidators: true,
  }).select('-password');

  if (!user) {
    const err = new Error('Usuario no encontrado');
    err.status = 404;
    throw err;
  }
  return user;
}
