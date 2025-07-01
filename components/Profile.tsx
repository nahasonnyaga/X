import ProfileHeader from './ProfileHeader';
import ProfileTabs from './ProfileTabs';

export default function Profile({ userId, sessionUserId }: { userId: string; sessionUserId?: string }) {
  return (
    <div>
      <ProfileHeader userId={userId} sessionUserId={sessionUserId} />
      <ProfileTabs userId={userId} />
    </div>
  );
}
