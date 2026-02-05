import { posterFor } from "../utils/posters";
import MovieCard from "./MovieCard";

export default function InsightRenderer({ payload, data, onMovieClick }) {
  if (!payload) return null;

  const type = payload.type;

  if (type === "trending") {
    const items = (data?.items || data || []).map((x) => ({ ...x, poster: posterFor(x.title) }));
    return (
      <div className="mt-6 flex gap-3 overflow-x-auto pb-3">
        {items.map((m) => (
          <MovieCard key={m.movieId} movie={m} onClick={onMovieClick} />
        ))}
      </div>
    );
  }

  // Generic table renderer for simple grouped outputs
  const rows = data?.items || data || [];
  if (!Array.isArray(rows) || rows.length === 0) return <div className="mt-6 text-white/70">No data.</div>;

  const cols = Object.keys(rows[0]);
  return (
    <div className="mt-6 overflow-x-auto rounded-3xl border border-white/10">
      <table className="w-full text-sm">
        <thead className="bg-white/5">
          <tr>
            {cols.map((c) => (
              <th key={c} className="text-left text-white/70 px-4 py-3">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-white/10">
              {cols.map((c) => (
                <td key={c} className="px-4 py-3 text-white">{String(r[c])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
