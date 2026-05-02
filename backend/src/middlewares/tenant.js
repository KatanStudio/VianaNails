import { getDb } from '../config/db.js';

export async function tenantMiddleware(req, res, next) {
  // Actualmente solo existe VianaNails.
  // En el futuro: extraer de subdominio, header o JWT.
  const clientId = req.headers['x-tenant-id'] || 'viana_nails';
  try {
    req.db = await getDb(clientId);
    next();
  } catch (err) {
    next(err);
  }
}
