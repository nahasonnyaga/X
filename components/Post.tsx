import { FaRegComment, FaRetweet, FaHeart, FaChartBar } from "react-icons/fa";

export default function Post({ post }: { post: any }) {
  return (
    <div className="border-b border-gray-800 p-4 flex space-x-4">
      <img
        src={post.user_avatar_url || "/default-avatar.png"}
        alt="User Avatar"
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-bold">{post.user_display_name}</span>
          {post.user_verified && (
            <span className="text-blue-400 ml-1">✔</span>
          )}
          <span className="text-gray-400 text-sm">@{post.user_username}</span>
          <span className="mx-1 text-gray-600">·</span>
          <span className="text-gray-400 text-sm">{new Date(post.created_at).toLocaleDateString()}</span>
        </div>
        <div className="mt-1">{post.content}</div>
        {post.media_url && (
          <img src={post.media_url} alt="post media" className="rounded-lg mt-2 max-h-80" />
        )}
        <div className="flex items-center space-x-8 mt-2 text-gray-400">
          <button className="flex items-center gap-1"><FaRegComment /> {post.comment_count}</button>
          <button className="flex items-center gap-1"><FaRetweet /> {post.retweet_count}</button>
          <button className="flex items-center gap-1"><FaHeart /> {post.like_count}</button>
          <span className="flex items-center gap-1"><FaChartBar /> {post.view_count}</span>
        </div>
      </div>
    </div>
  );
}
