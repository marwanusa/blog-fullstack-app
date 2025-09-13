"use client";

import { Suspense, useEffect, useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import ProfileHeaderSkeleton from "@/skeletons/ProfileHeaderSkeleton";
import PostCardSkeleton from "@/types/PostCardSkeleton";
import UserPosts from "./UserPosts";
import ProfileHeader from "./ProfileHeader";
import useAuth from "@/hooks/useAuth";

export default function ProfilePage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useUserProfile(id);
  const { user } = useAuth();
  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
    if (user?._id === id) {
      setIsOwner(true);
    }
  }, [user,id]);

  if (isError) return <p className="text-red-500">Error loading profile</p>;

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
          <Button variant="outline">Create Post</Button>
          <Button variant="destructive">Delete Account</Button>
        </div>
      )}

      {/* User Posts */}
      <h3 className="text-lg font-semibold mb-3">
        {isOwner ? "Your" : data?.username} Posts
      </h3>
      <Suspense fallback={<PostCardSkeleton />}>
        {isLoading ? <PostCardSkeleton /> : <UserPosts posts={data.posts} />}
      </Suspense>
    </div>
  );
}
