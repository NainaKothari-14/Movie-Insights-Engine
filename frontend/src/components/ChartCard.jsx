export default function ChartCard({ title, children }) {
    return (
      <div className="rounded-3xl bg-white/5 border border-white/10 p-5">
        <div className="text-white font-bold mb-3">{title}</div>
        <div className="h-[320px]">{children}</div>
      </div>
    );
  }
  