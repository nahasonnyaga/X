import { useEffect, useState } from "react";
import { supabase } from "../../supabase/client";
import TrendingCard from "./TrendingCard";
export default function TrendingTab() {
  const [trends, setTrends] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("trends").select("*").order("rank")
      .then(({ data }) => setTrends(data || []));
  }, []);
  return (
    <div>
      {trends.map(trend => (
        <TrendingCard key={trend.id} trend={trend} />
      ))}
    </div>
  );
}
