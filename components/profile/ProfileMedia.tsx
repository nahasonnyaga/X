import { useEffect, useState } from "react";
import { supabase } from "../../supabase/client";

export default function ProfileMedia({ userId }: { userId: string }) {
  const [mediaPosts, setMediaPosts] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("posts").select("*").eq("user_id", userId).not("media_url", "is", null)
      .then(({ data }) => setMediaPosts(data || []));
  }, [userId]);
  if (mediaPosts.length === 0) return <div className="p-4 text-gray-400">No media yet.</div>;
  return (
    <div className="grid grid-cols-2 gap-2 p-6">
      {mediaPosts.map(p => (
        <img key={p.id} src={p.media_url} alt="Media" className="w-full h-40 object-cover rounded-lg" />
      ))}
    </div>
  );
}
