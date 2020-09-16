import express from 'express';
import mongoose from 'mongoose';

import { Event } from '../models/event';
import { jsonToEventData, eventToJson, jsonToEvent } from '../models/event/transform';
// import locationTransformedEvents from '../models/event/locationTransformed';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await Event.find();
    const events = data.map((event: any) => {
      return eventToJson(event);
    });
    res.json(events);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = await Event.findById(req.params.id).exec();
    if (data === null) {
      return next();
    }
    const event = eventToJson(data);
    res.json(event);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, date, lat, long } = req.body;
    const inputData = { name, date, lat, long };
    const data = jsonToEvent(inputData);
    const event = new Event(data);
    await event.save();
    const jsonEvent = eventToJson(event);
    res.status(201).json(jsonEvent);
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
    const { name, date, lat, long } = req.body;
    const InputData = { name, date, lat, long };
    const data = jsonToEventData(InputData);
    const event = await Event.findByIdAndUpdate(req.params.id, data, { new: true });
    if (event === null) {
      return next();
    }
    const jsonEvent = eventToJson(event);
    res.status(200).json(jsonEvent);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return next();
    }
    const event = await Event.findByIdAndRemove(id, {});
    if (!event) {
      return next();
    }
    res.status(204).json();
  } catch (err) {
    next(err);
  }
});

export default router;
