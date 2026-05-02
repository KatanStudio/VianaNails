import { getCourseModel } from '../models/course.model.js';

export async function findAll(db, { type, showInactive } = {}) {
  const Course = getCourseModel(db);
  const query = showInactive ? {} : { isActive: true };
  if (type) query.type = type;
  return Course.find(query).sort({ order: 1, createdAt: 1 });
}

export async function findBySlug(db, slug) {
  const Course = getCourseModel(db);
  const course = await Course.findOne({ slug, isActive: true });
  if (!course) {
    const err = new Error('Curso no encontrado');
    err.status = 404;
    throw err;
  }
  return course;
}

export async function create(db, data) {
  const Course = getCourseModel(db);
  return Course.create(data);
}

export async function update(db, id, data) {
  const Course = getCourseModel(db);
  const course = await Course.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!course) {
    const err = new Error('Curso no encontrado');
    err.status = 404;
    throw err;
  }
  return course;
}

export async function softDelete(db, id) {
  const Course = getCourseModel(db);
  const course = await Course.findByIdAndUpdate(id, { isActive: false }, { new: true });
  if (!course) {
    const err = new Error('Curso no encontrado');
    err.status = 404;
    throw err;
  }
  return course;
}
