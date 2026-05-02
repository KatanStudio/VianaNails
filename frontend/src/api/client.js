const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

export async function apiFetch(path, accessToken, options = {}) {
  const { headers: extraHeaders, ...rest } = options;
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...extraHeaders,
    },
    ...rest,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Error en la petición');
  return data;
}
