export default function TrendingCard({ trend }: { trend: any }) {
  return (
    <div className="mb-4 px-4">
      <span className="text-gray-400 text-xs">{trend.rank} · {trend.category}</span>
      <div className="text-lg font-bold">{trend.topic}</div>
      <span className="text-gray-400 text-xs">{trend.post_count} posts</span>
    </div>
  );
}
