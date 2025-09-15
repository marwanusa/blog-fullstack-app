import EditProfileDialog from "@/components/EditProfileDialog";
import type { IUser } from "@/types/UserType";

function ProfileHeader({
  user,
  isOwner,
}: {
  user: IUser | undefined;
  isOwner: boolean;
}) {
  if (!user) {
    throw new Error("UnExpexted Error");
  }
  return (
    <div className="flex flex-col items-center space-y-3 py-6">
      <img
        src={user.profilePhoto.url}
        alt={user.username}
        className="h-24 w-24 rounded-full object-cover border"
      />
      <h2 className="text-xl font-semibold">{user.username}</h2>
      <p className="text-gray-600">{user.bio ?? "No bio available"}</p>
      <p className="text-sm text-gray-500">
        Joined: {new Date(user.createdAt).toLocaleDateString()}
      </p>
      {isOwner && <EditProfileDialog user={user} />}
    </div>
  );
}
export default ProfileHeader;
