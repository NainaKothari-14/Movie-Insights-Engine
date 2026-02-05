import axios from "axios";

export const api = axios.create({
  baseURL: "", // <- same origin so MSW intercepts /insights
  headers: { "Content-Type": "application/json" },
});
