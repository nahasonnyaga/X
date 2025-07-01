import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import Post from "./Post";

export default function Feed() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("posts").select("*").order("created_at", { ascending: false })
      .then(({ data }) => setPosts(data || []));
  }, []);

  return (
    <div>
      <header className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
        <h1 className="text-xl font-bold">For you</h1>
        <button className="text-white">Upgrade</button>
      </header>
      <div>
        {posts.map(post => <Post key={post.id} post={post} />)}
      </div>
    </div>
  );
}
