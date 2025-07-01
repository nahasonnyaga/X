import { useEffect, useState } from "react";
import { supabase } from "../../supabase/client";
import PostCard from "../feed/PostCard";
import Loader from "../common/Loader";

export default function ProfilePosts({ userId }: { userId: string }) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("posts").select("*, profiles(*)").eq("user_id", userId)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setPosts(data || []);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <Loader />;
  return (
    <div>
      {posts.map(post => <PostCard key={post.id} post={post} />)}
    </div>
  );
}
