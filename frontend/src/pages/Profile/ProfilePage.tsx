"use client";
import { Suspense, useEffect, useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import ProfileHeaderSkeleton from "@/skeletons/ProfileHeaderSkeleton";
import PostCardSkeleton from "@/skeletons/PostCardSkeleton";
import UserPosts from "./UserPosts";
import useAuth from "@/hooks/useAuth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import ProfileHeader from "./ProfileHeader";
import { CreatePost } from "@/components/CreatePostDialog";
export default function ProfilePage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useUserProfile(id);
  const { user } = useAuth();
  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
    if (user?._id === id) {
      setIsOwner(true);
    }
  }, [user, id]);

  if (isError) return <p className="text-red-500">Error loading profile</p>;
  function deleteAccountHandler(id: string) {
    toast.error("You can't delete your account at this time", {
      duration: 1000,
      dismissible: false,
    });
  }
  return (
    <div className="max-w-4xl mx-auto px-4 mb-4">
      {/* Profile Header */}
      <Suspense fallback={<ProfileHeaderSkeleton />}>
        {isLoading ? (
          <ProfileHeaderSkeleton />
        ) : (
          <ProfileHeader user={data} isOwner={isOwner} />
        )}
      </Suspense>
      {/* Create Post Button */}
      {isOwner && (
        <div className="flex justify-between items-center py-4">
          <CreatePost>
            <Button variant="outline">Create Post</Button>
          </CreatePost>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteAccountHandler(data._id)}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
      {/* User Posts */}
      <h3 className="text-lg font-semibold mb-3">
        {isOwner ? "Your" : data?.username} Posts
      </h3>
      <Suspense fallback={<PostCardSkeleton />}>
        {isLoading ? <PostCardSkeleton /> : <UserPosts posts={data?.posts} />}
      </Suspense>
    </div>
  );
}
