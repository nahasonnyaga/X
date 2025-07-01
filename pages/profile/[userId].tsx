import { useRouter } from "next/router";
import UserProfile from "../../components/UserProfile";
import { useSession } from "@supabase/auth-helpers-react";

export default function ProfilePage() {
  const router = useRouter();
  const { userId } = router.query;
  const session = useSession();

  if (!userId) return null;
  return (
    <div className="min-h-screen bg-black">
      <UserProfile userId={userId as string} sessionUserId={session?.user?.id} />
    </div>
  );
}
