export default function MovieCard({ movie, onClick }) {
    return (
      <button
        onClick={() => onClick?.(movie)}
        className="group relative w-[160px] md:w-[190px] shrink-0 text-left"
      >
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-[240px] md:h-[280px] object-cover group-hover:scale-[1.03] transition"
          />
        </div>
  
        <div className="mt-2">
          <div className="text-white text-sm font-semibold line-clamp-1">{movie.title}</div>
          <div className="text-white/60 text-xs line-clamp-1">
            {movie.genres?.join(", ")}
          </div>
        </div>
      </button>
    );
  }
  