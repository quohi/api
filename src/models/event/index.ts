import { Schema, model } from 'mongoose';

const EventSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  date: { type: Date, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

export const Event = model('Event', EventSchema);
