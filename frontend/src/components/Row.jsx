import MovieCard from "./MovieCard";

export default function Row({ title, items, onItemClick }) {
  return (
    <section className="max-w-6xl mx-auto px-4 mt-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white text-lg font-bold">{title}</h2>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-none">
        {items?.map((m) => (
          <MovieCard key={m.movieId || m._id} movie={m} onClick={onItemClick} />
        ))}
      </div>
    </section>
  );
}
