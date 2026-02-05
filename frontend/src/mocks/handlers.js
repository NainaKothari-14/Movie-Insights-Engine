import { http, HttpResponse } from "msw";
import { posterFor } from "../utils/posters";

const MOVIES = [
  { movieId: "m1", title: "Neon Heist", genres: ["Action", "Crime"], sessions: 120, watchMins: 5400 },
  { movieId: "m2", title: "Midnight Signal", genres: ["Sci-Fi", "Thriller"], sessions: 98, watchMins: 4300 },
  { movieId: "m3", title: "Crimson Notes", genres: ["Drama"], sessions: 84, watchMins: 3900 },
  { movieId: "m4", title: "Laugh District", genres: ["Comedy"], sessions: 79, watchMins: 3000 },
  { movieId: "m5", title: "Ocean Ember", genres: ["Adventure"], sessions: 72, watchMins: 2800 },
].map((m) => ({ ...m, poster: posterFor(m.title) }));

const GENRES = [
  { genre: "Action", sessions: 240, watchMins: 9800 },
  { genre: "Drama", sessions: 190, watchMins: 8600 },
  { genre: "Sci-Fi", sessions: 170, watchMins: 8100 },
  { genre: "Comedy", sessions: 150, watchMins: 6200 },
];

const SEGMENTS = [
  { userId: "u1", sessions7d: 14, sessions30d: 40, daysSinceLastWatch: 1, segment: "Binge" },
  { userId: "u2", sessions7d: 4, sessions30d: 10, daysSinceLastWatch: 2, segment: "Casual" },
  { userId: "u3", sessions7d: 0, sessions30d: 0, daysSinceLastWatch: 45, segment: "Inactive" },
  { userId: "u4", sessions7d: 2, sessions30d: 7, daysSinceLastWatch: 6, segment: "Casual" },
];

const DROPOFF = [
  { movieId: "m1", title: "Neon Heist", bucket: "Completed", sessions: 42 },
  { movieId: "m1", title: "Neon Heist", bucket: "Partial", sessions: 55 },
  { movieId: "m1", title: "Neon Heist", bucket: "Abandoned", sessions: 23 },
  { movieId: "m2", title: "Midnight Signal", bucket: "Completed", sessions: 38 },
  { movieId: "m2", title: "Midnight Signal", bucket: "Partial", sessions: 44 },
  { movieId: "m2", title: "Midnight Signal", bucket: "Abandoned", sessions: 16 },
];

export const handlers = [
  http.post("/insights", async ({ request }) => {
    const body = await request.json().catch(() => ({}));
    const { type, range, limit } = body || {};

    if (type === "trending") return HttpResponse.json({ items: MOVIES.slice(0, Number(limit) || 10), meta: { range } });
    if (type === "genre_popularity") return HttpResponse.json({ items: GENRES, meta: { range } });
    if (type === "viewer_segments") return HttpResponse.json({ items: SEGMENTS, meta: { range: "computed" } });
    if (type === "dropoff") return HttpResponse.json({ items: DROPOFF, meta: { range } });

    return HttpResponse.json({ items: [], meta: { error: "unknown type" } }, { status: 400 });
  }),
];
