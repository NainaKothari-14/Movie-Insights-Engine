import { computeRange } from "./range.js";

/**
 * Returns { pipeline, meta }
 */
export function buildPipeline(body = {}) {
  const { type, range = "7d", limit = 10 } = body;

  if (!type) throw new Error("Missing 'type'");

  // viewer_segments uses fixed windows (7d + 30d)
  if (type === "viewer_segments") {
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - 7);

    const monthStart = new Date(now);
    monthStart.setDate(now.getDate() - 30);

    return {
      meta: { type },
      pipeline: [
        { $match: { watchedAt: { $gte: monthStart } } },
        {
          $group: {
            _id: "$userId",
            lastWatch: { $max: "$watchedAt" },
            sessions30d: { $sum: 1 },
            sessions7d: {
              $sum: { $cond: [{ $gte: ["$watchedAt", weekStart] }, 1, 0] },
            },
          },
        },
        {
          $addFields: {
            daysSinceLastWatch: {
              $dateDiff: { startDate: "$lastWatch", endDate: "$$NOW", unit: "day" },
            },
          },
        },
        {
          $project: {
            _id: 0,
            userId: "$_id",
            sessions7d: 1,
            sessions30d: 1,
            daysSinceLastWatch: 1,
            segment: {
              $switch: {
                branches: [
                  { case: { $gte: ["$sessions7d", 10] }, then: "Binge" },
                  { case: { $gte: ["$sessions7d", 1] }, then: "Casual" },
                  { case: { $gte: ["$daysSinceLastWatch", 30] }, then: "Inactive" },
                ],
                default: "Inactive",
              },
            },
          },
        },
      ],
    };
  }

  // Types that use time range
  const { startDate, endDate } = computeRange(range);

  if (type === "trending") {
    return {
      meta: { type, range, limit: Number(limit) || 10 },
      pipeline: [
        { $match: { watchedAt: { $gte: startDate, $lte: endDate } } },
        {
          $group: {
            _id: "$movieId",
            sessions: { $sum: 1 },
            watchMins: { $sum: "$minutesWatched" },
          },
        },
        { $sort: { sessions: -1 } },
        { $limit: Number(limit) || 10 },
        {
          $lookup: {
            from: "movies",
            localField: "_id",
            foreignField: "_id",
            as: "movie",
          },
        },
        { $unwind: "$movie" },
        {
          $project: {
            _id: 0,
            movieId: "$movie._id",
            title: "$movie.title",
            genres: "$movie.genres",
            sessions: 1,
            watchMins: 1,
          },
        },
      ],
    };
  }

  if (type === "genre_popularity") {
    return {
      meta: { type, range },
      pipeline: [
        { $match: { watchedAt: { $gte: startDate, $lte: endDate } } },
        {
          $lookup: {
            from: "movies",
            localField: "movieId",
            foreignField: "_id",
            as: "movie",
          },
        },
        { $unwind: "$movie" },
        { $unwind: "$movie.genres" },
        {
          $group: {
            _id: "$movie.genres",
            sessions: { $sum: 1 },
            watchMins: { $sum: "$minutesWatched" },
          },
        },
        { $sort: { sessions: -1 } },
        { $limit: 10 },
        { $project: { _id: 0, genre: "$_id", sessions: 1, watchMins: 1 } },
      ],
    };
  }

  if (type === "dropoff") {
    return {
      meta: { type, range },
      pipeline: [
        { $match: { watchedAt: { $gte: startDate, $lte: endDate } } },
        {
          $lookup: {
            from: "movies",
            localField: "movieId",
            foreignField: "_id",
            as: "movie",
          },
        },
        { $unwind: "$movie" },
        {
          $addFields: {
            completionPct: {
              $cond: [
                { $gt: ["$movie.durationMins", 0] },
                { $divide: ["$minutesWatched", "$movie.durationMins"] },
                0,
              ],
            },
          },
        },
        {
          $project: {
            movieId: "$movie._id",
            title: "$movie.title",
            completionPct: 1,
            bucket: {
              $switch: {
                branches: [
                  { case: { $gte: ["$completionPct", 0.9] }, then: "Completed" },
                  { case: { $lt: ["$completionPct", 0.3] }, then: "Abandoned" },
                ],
                default: "Partial",
              },
            },
          },
        },
        {
          $group: {
            _id: { movieId: "$movieId", title: "$title", bucket: "$bucket" },
            sessions: { $sum: 1 },
          },
        },
        { $sort: { sessions: -1 } },
        { $limit: 20 },
        {
          $project: {
            _id: 0,
            movieId: "$_id.movieId",
            title: "$_id.title",
            bucket: "$_id.bucket",
            sessions: 1,
          },
        },
      ],
    };
  }

  throw new Error(`Unknown type '${type}'`);
}
