import express from 'express';
import mongoose from 'mongoose';

import { Event } from '../models/event';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).exec();
    res.json(event);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, date, location } = req.body;
    const data = { name, date, location };
    const event = new Event(data);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return next();
    }
    const { name, date, location } = req.body;
    const data = { name, date, location };
    const event = await Event.findByIdAndUpdate(req.params.id, data, { new: true });

    res.status(200).json(event);
  } catch (err) {
    next(err);
  }
});

export default router;
