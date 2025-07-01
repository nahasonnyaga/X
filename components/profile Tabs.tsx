import { Tab } from "@headlessui/react";
import Post from "./Post";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import classNames from "classnames";

export default function ProfileTabs({ userId }: { userId: string }) {
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("posts").select("*").eq("user_id", userId)
      .order("created_at", { ascending: false })
      .then(({ data }) => setPosts(data || []));
  }, [userId]);
  return (
    <Tab.Group>
      <Tab.List className="flex space-x-6 px-6 border-b border-gray-700">
        {["Posts", "Replies", "Highlights", "Articles", "Media"].map(tab => (
          <Tab
            key={tab}
            className={({ selected }) =>
              classNames(
                "px-2 py-2 text-md font-semibold",
                selected ? "border-b-2 border-blue-500 text-white" : "text-gray-400"
              )
            }
          >
            {tab}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          {posts.map(post => <Post key={post.id} post={post} />)}
        </Tab.Panel>
        <Tab.Panel>
          <div className="p-4 text-gray-400">Replies coming soon...</div>
        </Tab.Panel>
        <Tab.Panel>
          <div className="p-4 text-gray-400">Highlights coming soon...</div>
        </Tab.Panel>
        <Tab.Panel>
          <div className="p-4 text-gray-400">Articles coming soon...</div>
        </Tab.Panel>
        <Tab.Panel>
          <div className="grid grid-cols-2 gap-2 p-6">
            {posts.filter(p => p.media_url).map(p => (
              <img key={p.id} src={p.media_url} alt="Media" className="w-full h-40 object-cover rounded-lg" />
            ))}
          </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
