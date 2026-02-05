import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const navClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm ${isActive ? "bg-white/10" : "hover:bg-white/5"}`;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-black/40 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-wide text-red-500">
          CinePulse
        </Link>

        <div className="flex items-center gap-2 text-white/90">
          <NavLink to="/" className={navClass}>Home</NavLink>
          <NavLink to="/insights" className={navClass}>Insights</NavLink>
          <NavLink to="/dashboard" className={navClass}>Dashboard</NavLink>
        </div>
      </div>
    </div>
  );
}
