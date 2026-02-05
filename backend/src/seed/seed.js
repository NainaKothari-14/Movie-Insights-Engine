import "dotenv/config";
import mongoose from "mongoose";
import { Movie } from "../models/Movie.js";
import { User } from "../models/User.js";
import { WatchSession } from "../models/WatchSession.js";

const GENRES = ["Action", "Drama", "Comedy", "Thriller", "Sci-Fi", "Romance", "Crime", "Adventure"];
const DEVICES = ["mobile", "web", "tv"];

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pick(arr) {
  return arr[randInt(0, arr.length - 1)];
}
function pickMany(arr, nMin = 1, nMax = 3) {
  const n = randInt(nMin, nMax);
  const copy = [...arr];
  const out = [];
  while (out.length < n && copy.length) {
    out.push(copy.splice(randInt(0, copy.length - 1), 1)[0]);
  }
  return out;
}

function daysAgoDate(d) {
  const dt = new Date();
  dt.setDate(dt.getDate() - d);
  dt.setHours(randInt(0, 23), randInt(0, 59), randInt(0, 59), 0);
  return dt;
}

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Connected for seeding");

  await Promise.all([Movie.deleteMany({}), User.deleteMany({}), WatchSession.deleteMany({})]);
  console.log("🧹 Cleared collections");

  // Movies
  const movies = await Movie.insertMany(
    Array.from({ length: 40 }).map((_, i) => ({
      title: `Movie ${i + 1}`,
      genres: pickMany(GENRES, 1, 3),
      releaseYear: randInt(1995, 2026),
      durationMins: randInt(70, 180),
      createdAt: daysAgoDate(randInt(0, 120)),
    }))
  );

  // Users
  const users = await User.insertMany(
    Array.from({ length: 25 }).map((_, i) => ({
      name: `User ${i + 1}`,
      joinedAt: daysAgoDate(randInt(10, 300)),
    }))
  );

  // Watch sessions (last 60 days)
  const sessions = [];
  for (let i = 0; i < 1200; i++) {
    const user = pick(users);
    const movie = pick(movies);
    const watchedAt = daysAgoDate(randInt(0, 60));

    // minutesWatched: bias towards partial watches
    const cap = movie.durationMins;
    const minutesWatched = Math.min(
      cap,
      Math.max(1, Math.round(cap * (Math.random() * 0.9)))
    );

    sessions.push({
      userId: user._id,
      movieId: movie._id,
      watchedAt,
      minutesWatched,
      device: pick(DEVICES),
    });
  }

  await WatchSession.insertMany(sessions);
  console.log(`🎬 Seeded: ${movies.length} movies, ${users.length} users, ${sessions.length} sessions`);

  await mongoose.disconnect();
  console.log("✅ Done");
}

run().catch((e) => {
  console.error("❌ Seed failed:", e);
  process.exit(1);
});
