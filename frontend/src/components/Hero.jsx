export default function Hero({ movie }) {
  if (!movie) return null;

  // Use movie poster if available, otherwise use a cinematic fallback
  const backgroundImage = movie.poster || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80';

  return (
    <section className="relative h-[75vh] min-h-[500px] flex items-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt={movie.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback if image fails to load
            e.target.src = 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&q=80';
          }}
        />
        {/* Split gradient - left side dark, right side shows image */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        {/* Bottom gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-8 pb-16 md:pb-20">
        <div className="max-w-2xl space-y-5">
          {/* Meta Info */}
          <div className="flex items-center gap-3 text-sm font-medium">
            <span className="px-3 py-1 rounded-md bg-red-600 text-white shadow-lg shadow-red-600/20">
              Featured
            </span>
            {movie.rated && (
              <span className="px-2.5 py-0.5 rounded border border-white/30 text-white/90 bg-black/40 backdrop-blur-sm">
                {movie.rated}
              </span>
            )}
            {movie.genres?.slice(0, 3).map((genre, i) => (
              <span key={i} className="text-white/90">
                {genre}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.1] drop-shadow-2xl">
            {movie.title}
          </h1>

          {/* Stats */}
          {(movie.year || movie.runtime || movie.imdb?.rating) && (
            <div className="flex items-center gap-4 text-white/90 text-sm font-medium">
              {movie.year && <span>{movie.year}</span>}
              {movie.runtime && (
                <>
                  <span className="w-1 h-1 rounded-full bg-white/60" />
                  <span>{movie.runtime} min</span>
                </>
              )}
              {movie.imdb?.rating && (
                <>
                  <span className="w-1 h-1 rounded-full bg-white/60" />
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 fill-yellow-400" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span>{movie.imdb.rating}/10</span>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Description */}
          <p className="text-base md:text-lg text-white leading-relaxed max-w-xl font-light">
            {movie.plot || "Watch insights like a streaming platform — powered by MongoDB aggregation."}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button className="group flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-white text-black font-bold text-base hover:bg-white/90 transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95">
              <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play Trailer
            </button>
            
            <button className="group flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-white/10 backdrop-blur-md text-white font-semibold text-base border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all hover:scale-105 active:scale-95">
              <svg className="w-5 h-5 stroke-current stroke-2 fill-none group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              More Info
            </button>

            <button className="group p-3.5 rounded-lg bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all hover:scale-105 active:scale-95">
              <svg className="w-5 h-5 stroke-current stroke-2 fill-none group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom fade for seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}