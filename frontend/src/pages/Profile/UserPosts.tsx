import Post from "@/components/Post";
import type { IPost } from "@/types/PostType";

function UserPosts({ posts }: { posts: IPost[] }) {
  if (posts.length === 0) return <p>No posts yet.</p>;
  return (
    <div className="grid gap-6">
      {posts.map((post, idx) => (
        <div key={idx}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
}

export default UserPosts;
