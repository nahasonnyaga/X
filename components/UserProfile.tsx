import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { FaCheckCircle, FaEdit, FaEnvelope, FaLink } from "react-icons/fa";
import { MdCake, MdCalendarToday, MdVerified } from "react-icons/md";
import { Tab } from "@headlessui/react";
import classNames from "classnames";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type UserProfileProps = {
  userId: string;
  sessionUserId?: string;
};

export default function UserProfile({ userId, sessionUserId }: UserProfileProps) {
  const [profile, setProfile] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [followers, setFollowers] = useState<number>(0);
  const [following, setFollowing] = useState<number>(0);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    // Fetch profile info
    supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single()
      .then(({ data }) => setProfile(data));

    // Fetch posts
    supabase
      .from("posts")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .then(({ data }) => setPosts(data || []));

    // Fetch follower/following counts
    supabase
      .from("follows")
      .select("id", { count: "exact" })
      .eq("following_id", userId)
      .then(({ count }) => setFollowers(count ?? 0));
    supabase
      .from("follows")
      .select("id", { count: "exact" })
      .eq("follower_id", userId)
      .then(({ count }) => setFollowing(count ?? 0));

    // Check if current session user is following
    if (sessionUserId) {
      supabase
        .from("follows")
        .select("id")
        .eq("follower_id", sessionUserId)
        .eq("following_id", userId)
        .then(({ data }) => setIsFollowing((data || []).length > 0));
    }
  }, [userId, sessionUserId]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-black text-white rounded-lg shadow-lg">
      {/* Profile Banner */}
      <div className="relative h-40 bg-gradient-to-r from-pink-600 to-purple-700 flex items-center justify-between p-6">
        <div className="flex space-x-6">
          <div>
            <img
              src={profile.avatar_url || "/default-avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white -mb-12"
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-bold">{profile.display_name}</h2>
              {profile.verified && (
                <MdVerified className="text-blue-400" title="Verified" />
              )}
            </div>
            <span className="text-gray-300">@{profile.username}</span>
            <div className="mt-2 text-sm">{profile.bio}</div>
          </div>
        </div>
        {sessionUserId === userId ? (
          <button className="bg-white text-black rounded-full px-4 py-2 shadow hover:bg-gray-200 flex items-center">
            <FaEdit className="mr-2" /> Edit Profile
          </button>
        ) : (
          <div className="flex flex-col gap-2">
            <button className="bg-blue-500 text-white rounded-full px-4 py-2 shadow hover:bg-blue-600 flex items-center">
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
            <button className="bg-gray-800 text-gray-100 rounded-full px-2 py-2 shadow hover:bg-gray-700 flex items-center justify-center">
              <FaEnvelope />
            </button>
          </div>
        )}
      </div>
      {/* Banner quick links */}
      <div className="flex space-x-10 px-6 py-2 bg-black">
        <div className="text-center">
          <span className="block font-semibold text-lg">MUSIC</span>
        </div>
        <div className="text-center">
          <span className="block font-semibold text-lg">CELEBRITY GOSSIP</span>
        </div>
        <div className="text-center">
          <span className="block font-semibold text-lg">Teatagram Reels</span>
        </div>
      </div>
      {/* Profile Details */}
      <div className="px-6 mt-10">
        <div className="text-lg font-semibold">{profile.category}</div>
        <div className="flex items-center gap-2 mt-1 text-gray-400">
          <FaLink />
          <a
            href={profile.website}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-400"
          >
            {profile.website}
          </a>
        </div>
        <div className="flex items-center gap-4 mt-2 text-gray-400">
          <span className="flex items-center gap-1">
            <MdCake />
            Born {profile.birthdate && new Date(profile.birthdate).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <MdCalendarToday />
            Joined {profile.joined_at && new Date(profile.joined_at).toLocaleDateString()}
          </span>
        </div>
        <div className="mt-2 flex space-x-5 text-gray-200">
          <span>
            <b>{following}</b> Following
          </span>
          <span>
            <b>{followers}</b> Followers
          </span>
        </div>
      </div>
      {/* Tabs: Posts, Replies, Highlights, Articles, Media */}
      <div className="mt-6 border-b border-gray-700">
        <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
          <Tab.List className="flex space-x-6 px-6">
            {["Posts", "Replies", "Highlights", "Articles", "Media"].map((tab) => (
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
              {/* Posts */}
              <div>
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="border-b border-gray-700 px-6 py-4 flex space-x-4"
                  >
                    <img
                      src={profile.avatar_url || "/default-avatar.png"}
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{profile.display_name}</span>
                        {profile.verified && (
                          <MdVerified className="text-blue-400" title="Verified" />
                        )}
                        <span className="text-gray-400 text-sm">
                          @{profile.username} · {new Date(post.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="mt-1">{post.content}</div>
                      {post.media_url && (
                        <img
                          src={post.media_url}
                          alt="Post media"
                          className="rounded-lg mt-2 max-h-80"
                        />
                      )}
                      {/* Add more post actions here */}
                    </div>
                  </div>
                ))}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              {/* Replies */}
              <div className="text-gray-400 p-6">Replies coming soon...</div>
            </Tab.Panel>
            <Tab.Panel>
              {/* Highlights */}
              <div className="text-gray-400 p-6">Highlights coming soon...</div>
            </Tab.Panel>
            <Tab.Panel>
              {/* Articles */}
              <div className="text-gray-400 p-6">Articles coming soon...</div>
            </Tab.Panel>
            <Tab.Panel>
              {/* Media */}
              <div className="grid grid-cols-2 gap-2 p-6">
                {posts
                  .filter((p) => p.media_url)
                  .map((p) => (
                    <img
                      key={p.id}
                      src={p.media_url}
                      alt="Media"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ))}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
