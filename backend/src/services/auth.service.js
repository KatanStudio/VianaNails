import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { getUserModel } from '../models/user.model.js';

function generateAccessToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role, tokenVersion: user.tokenVersion },
    env.ACCESS_TOKEN_SECRET,
    { expiresIn: env.ACCESS_TOKEN_EXPIRY }
  );
}

function generateRefreshToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), tokenVersion: user.tokenVersion },
    env.REFRESH_TOKEN_SECRET,
    { expiresIn: env.REFRESH_TOKEN_EXPIRY }
  );
}

const PASSWORD_POLICY = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;

function validatePassword(password) {
  if (!PASSWORD_POLICY.test(password)) {
    const err = new Error(
      'La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial'
    );
    err.status = 422;
    throw err;
  }
}

export async function register(db, data) {
  validatePassword(data.password ?? '');

  const User = getUserModel(db);
  const userCount = await User.countDocuments();
  const role = userCount === 0 ? 'admin' : 'cliente';
  const user = await User.create({ ...data, role });

  const accessToken = generateAccessToken(user);
  return { user, accessToken };
}

export async function login(db, { email, password }) {
  const User = getUserModel(db);
  const user = await User.findOne({ email, isActive: true }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    const err = new Error('Credenciales inválidas');
    err.status = 401;
    throw err;
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  return { user, accessToken, refreshToken };
}

export async function refresh(db, refreshToken) {
  let payload;
  try {
    payload = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET);
  } catch {
    const err = new Error('Refresh token inválido o expirado');
    err.status = 401;
    throw err;
  }

  const User = getUserModel(db);
  const user = await User.findById(payload.sub);

  if (!user || !user.isActive || user.tokenVersion !== payload.tokenVersion) {
    const err = new Error('Refresh token revocado');
    err.status = 401;
    throw err;
  }

  return { accessToken: generateAccessToken(user) };
}

export async function logout(db, userId) {
  const User = getUserModel(db);
  await User.findByIdAndUpdate(userId, { $inc: { tokenVersion: 1 } });
}
