
import express from 'express';
import { authMiddleware } from '../middleware/auth';
import Course from '../models/Course';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    const course = new Course({
      title,
      description,
      teacher: req.user.userId
    });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create course' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('teacher', 'name email')
      .populate('students', 'name email');
    res.json(courses);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch courses' });
  }
});

export default router;
