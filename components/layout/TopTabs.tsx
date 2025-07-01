import { useRouter } from "next/router";

const tabs = [
  { label: "For You", path: "/" },
  { label: "Trending", path: "/trending" },
  { label: "News", path: "/news" },
  { label: "Sports", path: "/sports" },
  { label: "Entertainment", path: "/entertainment" },
];

export default function TopTabs() {
  const router = useRouter();
  return (
    <nav className="flex border-b border-gray-800 bg-black">
      {tabs.map(tab => (
        <button
          key={tab.path}
          className={`flex-1 py-3 font-bold ${router.pathname === tab.path ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-300"}`}
          onClick={() => router.push(tab.path)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
