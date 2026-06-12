import { HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-blue-600"
        >
          <HeartHandshake />
          Jarurat Care
        </Link>

        <div className="flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/support">Support</Link>
          <Link to="/volunteer">Volunteer</Link>
          {token && (
  <Link to="/admin">
    Dashboard
  </Link>
)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;