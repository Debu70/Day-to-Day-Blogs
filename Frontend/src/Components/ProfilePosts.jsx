/* eslint-disable react/prop-types */ // Disabling prop-types linting rule
import { IF } from '../url'; // Importing IF constant from url file

const ProfilePosts = ({ p }) => { // Functional component receiving props 'p'
  // console.log(p) // Logging prop 'p' to console
  return (
    <div className="w-full flex mt-8 space-x-4"> {/* Outer container */}
      {/* Left section */}
      <div className="w-[35%] h-[200px] flex justify-center items-center"> {/* Left section container */}
        <img src={IF + p.photo} alt="" className="h-full w-full object-cover"/> {/* Image element */}
      </div>
      {/* Right section */}
      <div className="flex flex-col w-[65%]"> {/* Right section container */}
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">{p.title}</h1> {/* Post title */}
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4"> {/* Metadata container */}
          <p>@{p.username}</p> {/* Username */}
          <div className="flex space-x-2"> {/* Space between metadata */}
            <p>{new Date(p.updatedAt).toString().slice(0,15)}</p> {/* Date */}
            <p>{new Date(p.updatedAt).toString().slice(16,24)}</p> {/* Time */}
          </div>
        </div>
        <p className="text-sm md:text-lg">{p.desc.slice(0,200)+" ...Read more"}</p> {/* Post description */}
      </div>
    </div>
  );
};

export default ProfilePosts; // Exporting ProfilePosts component
