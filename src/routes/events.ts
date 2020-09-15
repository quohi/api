import express from 'express';
import { Event } from '../models/event';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await Event.find();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = await Event.findById(req.params.id).exec();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, date, location } = req.body;
    const event = new Event({ name, date, location });
    const data = await event.save();
    const result = res.status(201).json(data);
    return result;
  } catch (err) {
    next(err);
  }
});

export default router;
