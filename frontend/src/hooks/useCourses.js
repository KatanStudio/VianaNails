import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

export function useCourses(type) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = type
      ? `${API_URL}/courses?type=${type}`
      : `${API_URL}/courses`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar los cursos');
        return res.json();
      })
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [type]);

  return { courses, loading, error };
}
