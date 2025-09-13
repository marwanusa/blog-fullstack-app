import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IPost } from "@/types/PostType";
import { Button } from "./ui/button";

const Post = ({ post }: { post: IPost }) => {
  return (
    <Card key={post._id}>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={post.image.url}
          alt={post.title}
          className="h-80 w-full object-cover rounded-md"
        />
        <p className="mt-2 text-gray-600">{post.description}</p>
        <Button className="mt-3">Read More</Button>
      </CardContent>
    </Card>
  );
};

export default Post;
