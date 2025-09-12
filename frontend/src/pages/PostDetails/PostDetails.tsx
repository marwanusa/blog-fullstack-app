import { useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  return <div>PostDetails {id}</div>;
};

export default PostDetails;
