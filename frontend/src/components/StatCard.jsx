export default function StatCard({ label, value }) {
    return (
      <div className="rounded-3xl bg-white/5 border border-white/10 p-5">
        <div className="text-white/60 text-xs">{label}</div>
        <div className="text-white text-2xl font-extrabold mt-1">{value}</div>
      </div>
    );
  }
  