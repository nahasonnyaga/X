import { FaHome, FaSearch, FaBell, FaUserFriends } from "react-icons/fa";

export default function NavBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 flex justify-around p-2 z-50">
      <button><FaHome size={26} /></button>
      <button><FaSearch size={26} /></button>
      <button><FaUserFriends size={26} /></button>
      <button><FaBell size={26} /></button>
    </nav>
  );
}
