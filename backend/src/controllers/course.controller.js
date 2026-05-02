import * as courseService from '../services/course.service.js';

export async function getAll(req, res, next) {
  try {
    const { type } = req.query;
    const showInactive = req.user?.role === 'admin';
    const courses = await courseService.findAll(req.db, { type, showInactive });
    res.json(courses);
  } catch (err) {
    next(err);
  }
}

export async function getBySlug(req, res, next) {
  try {
    const course = await courseService.findBySlug(req.db, req.params.slug);
    res.json(course);
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const course = await courseService.create(req.db, req.body);
    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const course = await courseService.update(req.db, req.params.id, req.body);
    res.json(course);
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    await courseService.softDelete(req.db, req.params.id);
    res.json({ message: 'Curso desactivado correctamente' });
  } catch (err) {
    next(err);
  }
}
