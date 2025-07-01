import { FaHome, FaSearch, FaBell, FaUserFriends, FaEnvelope } from "react-icons/fa";
import { useRouter } from "next/router";

const navItems = [
  { icon: <FaHome size={22} />, path: "/", label: "Home" },
  { icon: <FaSearch size={22} />, path: "/search", label: "Search" },
  { icon: <FaUserFriends size={22} />, path: "/groups", label: "Groups" },
  { icon: <FaBell size={22} />, path: "/notifications", label: "Notifications" },
  { icon: <FaEnvelope size={22} />, path: "/messages", label: "Messages" },
];

export default function BottomNav() {
  const router = useRouter();
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 flex justify-around p-2 z-50">
      {navItems.map(item => (
        <button
          key={item.path}
          aria-label={item.label}
          onClick={() => router.push(item.path)}
          className="text-gray-300 hover:text-blue-400"
        >
          {item.icon}
        </button>
      ))}
    </nav>
  );
}
