import * as authService from '../services/auth.service.js';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export async function register(req, res, next) {
  try {
    const { user, accessToken } = await authService.register(req.db, req.body);
    res.status(201).json({ accessToken, user });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { user, accessToken, refreshToken } = await authService.login(req.db, req.body);
    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
    res.json({ accessToken, user });
  } catch (err) {
    next(err);
  }
}

export async function refresh(req, res, next) {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) {
      return res.status(401).json({ message: 'Refresh token no encontrado' });
    }
    const { accessToken } = await authService.refresh(req.db, token);
    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
}

export async function logout(req, res, next) {
  try {
    if (req.user?.sub) {
      await authService.logout(req.db, req.user.sub);
    }
    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'strict' });
    res.json({ message: 'Sesión cerrada correctamente' });
  } catch (err) {
    next(err);
  }
}
