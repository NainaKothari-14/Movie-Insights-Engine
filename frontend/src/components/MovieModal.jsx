export default function MovieModal({ open, movie, onClose }) {
    if (!open || !movie) return null;
  
    return (
      <div className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="w-full max-w-3xl rounded-3xl overflow-hidden border border-white/10 bg-zinc-950">
          <div className="relative h-[320px]">
            <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/15"
            >
              Close
            </button>
          </div>
  
          <div className="p-6">
            <h3 className="text-white text-2xl font-bold">{movie.title}</h3>
            <div className="mt-2 text-white/70 text-sm">{movie.genres?.join(" • ")}</div>
  
            <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <div className="text-white/60 text-xs">Sessions</div>
                <div className="text-white text-xl font-bold">{movie.sessions ?? "-"}</div>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <div className="text-white/60 text-xs">Watch Mins</div>
                <div className="text-white text-xl font-bold">{movie.watchMins ?? "-"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  