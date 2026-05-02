import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';

import { env } from './config/env.js';
import logger from './utils/logger.js';
import { tenantMiddleware } from './middlewares/tenant.js';

import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/users/user.routes.js';
import stockRoutes from './modules/stock/stock.routes.js';
import orderRoutes from './modules/orders/order.routes.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());

app.use(tenantMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// Manejo global de errores
app.use((err, _req, res, _next) => {
  logger.error(err.message, { stack: err.stack });

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(', ') });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'ID con formato inválido' });
  }
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue ?? {})[0] ?? 'campo';
    return res.status(409).json({ message: `Ya existe un registro con ese ${field}` });
  }

  const status = err.status ?? err.statusCode ?? 500;
  res.status(status).json({ message: err.message || 'Error interno del servidor' });
});

const PORT = parseInt(env.PORT, 10);
app.listen(PORT, () => {
  logger.info(`[app] Servidor corriendo en http://localhost:${PORT}`);
  logger.info(`[app] Entorno: ${env.NODE_ENV}`);
});

export default app;
