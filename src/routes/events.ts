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

export default router;
