import { api } from "./axios";

export async function fetchInsights(payload) {
  const { data } = await api.post("/insights", payload);
  return data;
}
