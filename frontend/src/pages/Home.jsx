import { useEffect, useMemo, useState } from "react";
import Hero from "../components/Hero";
import Row from "../components/Row";
import MovieModal from "../components/MovieModal";
import { fetchInsights } from "../api/insightsApi";
import { posterFor } from "../utils/posters";

function withPoster(list = []) {
  return list.map((x) => ({
    ...x,
    poster: x.poster || posterFor(x.title),
  }));
}

export default function Home() {
  const [trending7d, setTrending7d] = useState([]);
  const [trending30d, setTrending30d] = useState([]);
  const [modalMovie, setModalMovie] = useState(null);

  useEffect(() => {
    (async () => {
      const a = await fetchInsights({ type: "trending", range: "7d", limit: 12 });
      const b = await fetchInsights({ type: "trending", range: "30d", limit: 12 });
      setTrending7d(withPoster(a?.items || a || []));
      setTrending30d(withPoster(b?.items || b || []));
    })();
  }, []);

  const featured = useMemo(() => trending7d?.[0], [trending7d]);

  return (
    <div className="min-h-screen bg-black">
      <Hero movie={featured} />

      <Row title="Trending This Week" items={trending7d} onItemClick={setModalMovie} />
      <Row title="Trending This Month" items={trending30d} onItemClick={setModalMovie} />

      <MovieModal open={!!modalMovie} movie={modalMovie} onClose={() => setModalMovie(null)} />
    </div>
  );
}
