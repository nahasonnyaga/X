import { FaPlus } from "react-icons/fa";

export default function FloatingActionButton() {
  return (
    <button className="fixed bottom-16 right-6 bg-blue-500 rounded-full p-4 shadow-lg z-50">
      <FaPlus size={24} className="text-white" />
    </button>
  );
}
