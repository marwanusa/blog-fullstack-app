import { Skeleton } from "@/components/ui/skeleton";

function ProfileHeaderSkeleton() {
  return (
    <div className="flex flex-col items-center space-y-3 py-6">
      <Skeleton className="h-24 w-24 rounded-full" />
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-9 w-32 rounded-md" />
    </div>
  );
}

export default ProfileHeaderSkeleton