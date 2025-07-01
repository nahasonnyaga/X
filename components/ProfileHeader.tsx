import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { MdVerified } from "react-icons/md";

export default function ProfileHeader({ userId, sessionUserId }: { userId: string; sessionUserId?: string }) {
  const [profile, setProfile] = useState<any>(null);
  useEffect(() => {
    supabase.from("profiles").select("*").eq("id", userId).single()
      .then(({ data }) => setProfile(data));
  }, [userId]);
  if (!profile) return <div>Loading...</div>;
  return (
    <div className="bg-gradient-to-r from-pink-600 to-purple-700 p-6 rounded-b-lg">
      <div className="flex items-center space-x-4">
        <img src={profile.avatar_url || "/default-avatar.png"} alt="avatar" className="w-24 h-24 rounded-full border-4 border-white" />
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{profile.display_name}</span>
            {profile.verified && <MdVerified className="text-blue-400" />}
          </div>
          <span className="text-gray-300">@{profile.username}</span>
          <div className="mt-2 text-sm">{profile.bio}</div>
        </div>
      </div>
      <div className="mt-4 flex space-x-6">
        <div><span className="font-bold">{profile.following}</span> Following</div>
        <div><span className="font-bold">{profile.followers}</span> Followers</div>
      </div>
    </div>
  );
}
