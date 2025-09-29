import { Link } from "react-router-dom";
import afterdarkLogo from "../assets/afterdark-logo.png";

function Navbar() {
  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center shadow-lg">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img 
          src={afterdarkLogo} 
          alt="234 AfterDark Logo" 
          className="h-10 w-auto drop-shadow-[0_0_12px_#ff00ff]" 
        />
        {/* Optional text next to logo */}
        <span className="hidden sm:inline font-extrabold text-xl text-pink-500 tracking-wide">
          Concepts
        </span>
      </Link>

      {/* Nav Links */}
      <div className="space-x-6">
        <Link to="/" className="hover:text-pink-400">Home</Link>
        <Link to="/events" className="hover:text-pink-400">Events</Link>
        <Link to="/sponsors" className="hover:text-pink-400">Sponsors</Link>
        <Link to="/gallery" className="hover:text-purple-400">Gallery</Link>
        <Link to="/confessions" className="hover:text-pink-400">Confessions</Link>
      </div>
    </nav>
  );
}

export default Navbar;
