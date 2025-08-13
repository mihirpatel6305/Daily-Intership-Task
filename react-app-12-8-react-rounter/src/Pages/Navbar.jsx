import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-indigo-200 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center space-x-6">
        <Link to="/">Home</Link>
        <Link to="/about-us">About Us</Link>
        <Link to="/services">Services</Link>
      </div>
    </nav>
  );
}

export default Navbar;
