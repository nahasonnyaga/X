export default function ProfileStats({ following, followers }: { following: number, followers: number }) {
  return (
    <div className="flex space-x-6 mt-2 px-6 text-gray-200">
      <span><b>{following}</b> Following</span>
      <span><b>{followers}</b> Followers</span>
    </div>
  );
}
