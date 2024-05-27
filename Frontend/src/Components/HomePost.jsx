/* eslint-disable react/prop-types */ // Disable eslint rule for prop-types in this file
import { IF } from '../url'; // Importing IF from url module

// Component for rendering individual home posts
const HomePosts = ({ post }) => {
  return (
    <div className="w-full flex mt-8 space-x-4">
      {/* Left section */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        {/* Display post photo */}
        <img src={IF + post.photo} alt="" className="h-full w-full object-cover" />
      </div>
      {/* Right section */}
      <div className="flex flex-col w-[65%]">
        {/* Post title */}
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          {post.title}
        </h1>
        {/* Author and date */}
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@{post.username}</p>
          {/* Display post updated date */}
          <div className="flex space-x-2 text-sm">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        {/* Post description */}
        <p className="text-sm md:text-lg">{post.desc.slice(0, 200) + " ...Read more"}</p>
      </div>
    </div>
  );
};

export default HomePosts;
