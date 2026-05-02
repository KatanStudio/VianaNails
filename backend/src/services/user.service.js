import { getUserModel } from '../models/user.model.js';

const PASSWORD_POLICY = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;

export async function findAll(db) {
  const User = getUserModel(db);
  return User.find().select('-password').sort({ createdAt: -1 });
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

export async function createUser(db, data) {
  if (!PASSWORD_POLICY.test(data.password ?? '')) {
    const err = new Error('La contraseña no cumple los requisitos de seguridad');
    err.status = 422;
    throw err;
  }
  const User = getUserModel(db);
  const user = await User.create(data);
  const { password: _, ...safe } = user.toJSON();
  return safe;
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
