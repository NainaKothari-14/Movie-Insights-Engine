import { useState } from "react";

export default function InsightQueryForm({ onRun }) {
  const [type, setType] = useState("trending");
  const [range, setRange] = useState("7d");
  const [limit, setLimit] = useState(10);

  function submit(e) {
    e.preventDefault();
    const payload = { type, range };
    if (type === "trending") payload.limit = Number(limit);
    onRun?.(payload);
  }

  return (
    <form onSubmit={submit} className="rounded-3xl bg-white/5 border border-white/10 p-5">
      <div className="grid md:grid-cols-3 gap-3">
        <div>
          <label className="text-white/70 text-xs">Insight Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 w-full rounded-xl bg-black/40 border border-white/10 text-white px-3 py-2"
          >
            <option value="trending">Trending Movies</option>
            <option value="genre_popularity">Genre Popularity</option>
            <option value="viewer_segments">Viewer Segments</option>
            <option value="dropoff">Drop-off Analysis</option>
          </select>
        </div>

        <div>
          <label className="text-white/70 text-xs">Range</label>
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="mt-1 w-full rounded-xl bg-black/40 border border-white/10 text-white px-3 py-2"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
        </div>

        <div>
          <label className="text-white/70 text-xs">Limit (Trending only)</label>
          <input
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            type="number"
            min="1"
            max="50"
            className="mt-1 w-full rounded-xl bg-black/40 border border-white/10 text-white px-3 py-2"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button className="px-5 py-3 rounded-2xl bg-red-600 text-white font-semibold hover:opacity-90">
          Run Insight
        </button>
      </div>
    </form>
  );
}
