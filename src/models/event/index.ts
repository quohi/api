import { Schema, model, Document } from 'mongoose';

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

export interface EventData {
  name: string;
  date: Date;
  location: {
    type: string;
    coordinates: Array<number>;
  };
}

export type EventModel = Document & EventData;

export const Event = model<EventModel>('Event', EventSchema);
