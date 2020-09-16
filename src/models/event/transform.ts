import { Event, EventModel, EventData } from '.';

export interface EventJson {
  name: string;
  date: Date;
  lat: number;
  long: number;
}

export function eventToJson(event: EventModel): EventJson {
  const { id, name, date, location } = event;
  const lat = location.coordinates[0];
  const long = location.coordinates[0];
  const json = { id, name, date, lat, long };
  return json;
}

export function jsonToEvent(json: EventJson): EventModel {
  const data = jsonToEventData(json);
  return new Event(data);
}

export function jsonToEventData(json: EventJson): EventData {
  const { name, date, lat, long } = json;
  return {
    name,
    date,
    location: {
      type: 'Point',
      coordinates: [lat, long],
    },
  };
}
