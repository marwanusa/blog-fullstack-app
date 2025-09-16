// import CategoryFilter from "@/components/CategoryFilter";
// import Post from "@/components/Post";
// import { useGetPosts } from "@/hooks/useGetPosts";
// import PostCardSkeleton from "@/skeletons/PostCardSkeleton";
// import { useState } from "react";

// const Posts = () => {
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const categories = [
//     "Music",
//     "Programming",
//     "Technology",
//     "Design",
//     "Health",
//     "Travel",
//   ];
//   const { data, isLoading, isError, error } = useGetPosts(selectedCategory);

//   if (isError) return <p className="text-red-500">Error: {error.message}</p>;

//   return (
//     <div className="flex flex-col items-center justify-center py-2">
//       <h1 className="text-3xl font-bold">Posts</h1>
//       <p className="text-muted-foreground text-md mt-1">
//         List of all posts will go here.
//       </p>
//       <div className="flex-col lg:flex-row flex w-full justify-evenly  mt-4 ">
//         <div className="flex flex-col gap-4">
//           {isLoading ? (
//             <PostCardSkeleton />
//           ) : data && data.length > 0 ? (
//             data.map((post) => (
//               <div key={post._id}>
//                 <Post post={post} />
//               </div>
//             ))
//           ) : (
//             <p>No posts available.</p>
//           )}
//         </div>
//         {/* Posts list will go here */}
//         <CategoryFilter
//           categories={categories}
//           selectedCategory={selectedCategory}
//           onCategorySelect={setSelectedCategory}
//           title="Categories"
//         />
//       </div>
//     </div>
//   );
// };

// export default Posts;
import CategoryFilter from "@/components/CategoryFilter";
import Post from "@/components/Post";
import { useGetPosts } from "@/hooks/useGetPosts";
import PostCardSkeleton from "@/skeletons/PostCardSkeleton";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Posts = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    "Music",
    "Programming",
    "Technology",
    "Design",
    "Health",
    "Travel",
  ];

  // Pass both selectedCategory and currentPage to useGetPosts
  const { data, isLoading, isError, error } = useGetPosts(
    selectedCategory,
    currentPage
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <h1 className="text-3xl font-bold">Posts</h1>
      <p className="text-muted-foreground text-md mt-1">
        List of all posts will go here.
      </p>
      <div className="flex-col-reverse lg:flex-row flex w-full justify-evenly mt-4">
        <div className="flex flex-col gap-4">
          {isLoading ? (
            <PostCardSkeleton />
          ) : data && data.length > 0 ? (
            <>
              {data.map((post) => (
                <div key={post._id}>
                  <Post post={post} />
                </div>
              ))}
            </>
          ) : (
            <p>No posts available.</p>
          )}
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategoryChange}
          title="Categories"
        />
      </div>
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={handlePrevPage}
          disabled={!(currentPage > 1) || isLoading}
          className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors
                    ${
                      !(currentPage > 1) || isLoading
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                    }
                  `}
        >
          <ChevronLeft size={20} />
          Previous
        </button>

        <span className="flex items-center gap-2 text-sm text-gray-600">
          Page {currentPage}
        </span>

        <button
          onClick={handleNextPage}
          className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                      (data && data.length === 0) || isLoading
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                    }`}
          disabled={isLoading || (data && data.length === 0)}
        >
          Next
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Posts;
