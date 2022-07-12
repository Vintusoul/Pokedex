import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="bg-gray-800">
        <div className="max-w-7xl flex justify-center mx-auto px-2 sm:px-6 lg:px-8 flex-shrink-0 items-center relative h-16">
          <Link to="/">
            <img
              className=" lg:block h-8 w-auto"
              src="/Pokemon.png"
              alt="Pokemon"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
