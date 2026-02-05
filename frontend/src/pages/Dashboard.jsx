import { useEffect, useMemo, useState } from "react";
import { fetchInsights } from "../api/insightsApi";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import {
  ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, Legend,
  LineChart, Line, CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const [trend, setTrend] = useState([]);
  const [genres, setGenres] = useState([]);
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const t = await fetchInsights({ type: "trending", range: "7d", limit: 10 });
        const g = await fetchInsights({ type: "genre_popularity", range: "30d" });
        const s = await fetchInsights({ type: "viewer_segments" });

        setTrend(t?.items || t || []);
        setGenres(g?.items || g || []);
        setSegments(s?.items || s || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const kpis = useMemo(() => {
    const sessions = trend.reduce((a, x) => a + (x.sessions || 0), 0);
    const mins = trend.reduce((a, x) => a + (x.watchMins || 0), 0);
    const avgRating = trend.length > 0 
      ? (trend.reduce((a, x) => a + (x.imdb?.rating || 0), 0) / trend.length).toFixed(1)
      : 0;
    return { sessions, mins, avgRating };
  }, [trend]);

  // Segment counts
  const segData = useMemo(() => {
    if (!segments.length) return [];
    if (segments[0]?.segment && segments[0]?.count) return segments;
    const map = new Map();
    for (const u of segments) map.set(u.segment, (map.get(u.segment) || 0) + 1);
    return Array.from(map.entries()).map(([segment, count]) => ({ segment, count }));
  }, [segments]);

  // Vibrant colors for charts
  const COLORS = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
      {/* Hero Section */}
      <div className="relative pt-24 pb-12 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{
               backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
               backgroundSize: '50px 50px'
             }} 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-blue-400 text-sm font-medium">Live Dashboard</span>
            </div>
            {loading && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-3 h-3 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
                <span className="text-white/60 text-sm">Updating...</span>
              </div>
            )}
          </div>

          {/* Title */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-3">
              Analytics <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Dashboard</span>
            </h1>
            <p className="text-xl text-white/60 font-light">
              Real-time insights into your streaming platform performance
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-red-600/20 to-red-600/5 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-red-600/20 rounded-xl">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <span className="text-xs text-red-400 font-medium px-2 py-1 bg-red-600/20 rounded-full">+12%</span>
              </div>
              <p className="text-white/60 text-sm mb-1">Trending Sessions</p>
              <p className="text-3xl font-bold text-white">{kpis.sessions.toLocaleString()}</p>
              <p className="text-xs text-white/40 mt-1">Top 10 movies / 7 days</p>
            </div>

            <div className="bg-gradient-to-br from-blue-600/20 to-blue-600/5 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-600/20 rounded-xl">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xs text-blue-400 font-medium px-2 py-1 bg-blue-600/20 rounded-full">+8%</span>
              </div>
              <p className="text-white/60 text-sm mb-1">Watch Minutes</p>
              <p className="text-3xl font-bold text-white">{kpis.mins.toLocaleString()}</p>
              <p className="text-xs text-white/40 mt-1">Total viewing time</p>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-purple-600/5 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-purple-600/20 rounded-xl">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-xs text-purple-400 font-medium px-2 py-1 bg-purple-600/20 rounded-full">+5%</span>
              </div>
              <p className="text-white/60 text-sm mb-1">Active Users</p>
              <p className="text-3xl font-bold text-white">{segments.length.toLocaleString()}</p>
              <p className="text-xs text-white/40 mt-1">From viewer segments</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-600/5 backdrop-blur-xl border border-yellow-500/20 rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-yellow-600/20 rounded-xl">
                  <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <span className="text-xs text-yellow-400 font-medium px-2 py-1 bg-yellow-600/20 rounded-full">Top 10</span>
              </div>
              <p className="text-white/60 text-sm mb-1">Avg Rating</p>
              <p className="text-3xl font-bold text-white">{kpis.avgRating}/10</p>
              <p className="text-xs text-white/40 mt-1">Trending movies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Trending Movies Chart */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:bg-white/[0.07] transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-600/20 rounded-lg">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Trending Movies</h3>
                  <p className="text-sm text-white/50">Session count (last 7 days)</p>
                </div>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="title" stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={100} />
                  <YAxis stroke="rgba(255,255,255,0.4)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.9)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="sessions" fill="#ef4444" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Genre Popularity Chart */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:bg-white/[0.07] transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Genre Popularity</h3>
                  <p className="text-sm text-white/50">Sessions by genre (30 days)</p>
                </div>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={genres}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="genre" stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 12 }} />
                  <YAxis stroke="rgba(255,255,255,0.4)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.9)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="sessions" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Viewer Segments Pie Chart */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:bg-white/[0.07] transition-all lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-600/20 rounded-lg">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Viewer Segments</h3>
                  <p className="text-sm text-white/50">User distribution by segment</p>
                </div>
              </div>
            </div>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={segData} 
                    dataKey="count" 
                    nameKey="segment" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={140}
                    label={({ segment, percent }) => `${segment} ${(percent * 100).toFixed(0)}%`}
                    labelLine={{ stroke: 'rgba(255,255,255,0.3)' }}
                  >
                    {segData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.9)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff'
                    }}
                  />
                  <Legend 
                    verticalAlign="middle" 
                    align="right"
                    layout="vertical"
                    wrapperStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}