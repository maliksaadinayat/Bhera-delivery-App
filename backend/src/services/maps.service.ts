import axios from 'axios';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export const getDirections = async (origin: string, destination: string) => {
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_MAPS_API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};

export const getDistanceMatrix = async (origins: string[], destinations: string[]) => {
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins.join('|')}&destinations=${destinations.join('|')}&key=${GOOGLE_MAPS_API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};
