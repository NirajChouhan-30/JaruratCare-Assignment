import { Link } from "react-router-dom";

const HeroSection = () => {
return ( <section className="bg-gradient-to-br from-blue-50 via-white to-teal-50 py-24">
  <div className="max-w-7xl mx-auto px-6">
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

      {/* Left Content */}
      <div>
        <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
          Connecting Patients,
          Volunteers, and
          <span className="block bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            Healthcare Support
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          Bridging the gap in medical care through community-driven action.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            to="/support"
            className="bg-blue-600 text-white px-6 py-3 rounded-full"
          >
            Request Support
          </Link>

          <Link
            to="/volunteer"
            className="border-2 border-teal-600 text-teal-600 px-6 py-3 rounded-full"
          >
            Become a Volunteer
          </Link>
        </div>
      </div>

      {/* Right Image */}
      <div>
        <img
          src="https://images.unsplash.com/photo-1584515933487-779824d29309"
          alt="Healthcare Support"
          className="w-full h-[500px] object-cover rounded-3xl shadow-xl"
        />
      </div>

    </div>

  </div>
</section>

);
};

export default HeroSection;
