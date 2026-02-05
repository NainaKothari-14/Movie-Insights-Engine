import { useState } from "react";
import InsightQueryForm from "../components/InsightQueryForm";
import InsightRenderer from "../components/InsightRenderer";
import MovieModal from "../components/MovieModal";
import { fetchInsights } from "../api/insightsApi";

export default function Insights() {
  const [payload, setPayload] = useState(null);
  const [data, setData] = useState(null);
  const [modalMovie, setModalMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  async function run(p) {
    setPayload(p);
    setData(null);
    setLoading(true);
    try {
      const res = await fetchInsights(p);
      setData(res);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-transparent to-purple-900/10 pointer-events-none" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{
               backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
               backgroundSize: '50px 50px'
             }} 
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-600/20 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-400 text-sm font-medium">Live Analytics</span>
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight">
              On-Demand <span className="bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">Insights</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto font-light">
              Query your aggregation pipelines like a product analyst. Unlock powerful insights with MongoDB aggregations.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-600/20 rounded-xl">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">Real-time</p>
                  <p className="text-sm text-white/50">Query Processing</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-600/20 rounded-xl">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">Advanced</p>
                  <p className="text-sm text-white/50">Aggregations</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-600/20 rounded-xl">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">Visual</p>
                  <p className="text-sm text-white/50">Data Display</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Query Form Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-600/20 rounded-lg">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white">Build Your Query</h2>
          </div>
          <InsightQueryForm onRun={run} />
        </div>

        {/* Results Section */}
        {(loading || data || payload) && (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-600/20 rounded-lg">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white">Results</h2>
              </div>
              
              {loading && (
                <div className="flex items-center gap-2 text-white/60">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
                  <span className="text-sm">Processing query...</span>
                </div>
              )}
            </div>

            <InsightRenderer 
              payload={payload} 
              data={data} 
              onMovieClick={setModalMovie} 
            />
          </div>
        )}

        {/* Empty State */}
        {!loading && !data && !payload && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-6">
              <svg className="w-10 h-10 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white/80 mb-2">No results yet</h3>
            <p className="text-white/50">Configure your query above to see insights</p>
          </div>
        )}
      </div>

      <MovieModal open={!!modalMovie} movie={modalMovie} onClose={() => setModalMovie(null)} />
    </div>
  );
}