const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Error en la petición');
  return data;
}

export function login(email, password) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function register(name, email, password) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
}

export function refresh() {
  return fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  }).then(res => (res.ok ? res.json() : null));
}

export function logout(accessToken) {
  return fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: { Authorization: `Bearer ${accessToken}` },
  }).catch(() => {});
}

export function getMe(accessToken) {
  return request('/users/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}
