import express from 'express';
import { Course } from '../models/Course';
import { authorize } from '../middleware/auth';

const router = express.Router();

// Get all courses (with filtering)
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query: any = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const courses = await Course.find(query)
      .populate('instructor', 'name email')
      .sort({ createdAt: -1 });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Create new course
router.post('/', authorize(['teacher', 'admin']), async (req, res) => {
  try {
    const course = new Course({
      ...req.body,
      instructor: req.user._id,
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create course' });
  }
});

// Get enrolled courses for student
router.get('/enrolled', authorize(['student']), async (req, res) => {
  try {
    const courses = await Course.find({
      enrolledStudents: req.user._id,
    }).populate('instructor', 'name email');

    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch enrolled courses' });
  }
});

// Get courses created by teacher
router.get('/teaching', authorize(['teacher']), async (req, res) => {
  try {
    const courses = await Course.find({
      instructor: req.user._id,
    });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teaching courses' });
  }
});

// Update course
router.put('/:id', authorize(['teacher', 'admin']), async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      {
        _id: req.params.id,
        instructor: req.user._id,
      },
      req.body,
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update course' });
  }
});

// Delete course
router.delete('/:id', authorize(['teacher', 'admin']), async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({
      _id: req.params.id,
      instructor: req.user._id,
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete course' });
  }
});

export default router;
