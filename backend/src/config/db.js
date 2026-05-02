import mongoose from 'mongoose';
import { env } from './env.js';
import logger from '../utils/logger.js';

const connections = new Map();

export async function getDb(clientId) {
  if (connections.has(clientId)) {
    return connections.get(clientId);
  }

  const uri = `${env.MONGO_URI}/${clientId}`;

  const conn = await mongoose
    .createConnection(uri, { serverSelectionTimeoutMS: 5000 })
    .asPromise();

  connections.set(clientId, conn);
  logger.info(`[db] Conectado a base de datos: ${clientId}`);

  conn.on('error', (err) => {
    logger.error(`[db] Error en conexión ${clientId}: ${err.message}`);
  });

  return conn;
}
