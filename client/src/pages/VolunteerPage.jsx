import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { createVolunteer } from "../services/volunteer.service";

const VolunteerPage = () => {
  const [loading, setLoading] = useState(false);

  const skillOptions = [
    "Medical Support",
  "Driving & Transport",
  "Medicine Delivery",
  "Elderly Care",
  "Patient Companion",
  "Counselling",
  "Fundraising",
  "Community Outreach",
  "Technology Support",
  "General Assistance",
];

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

     data.skills = data.skills || [];

      await createVolunteer(data);

      toast.success(
        "Volunteer registered successfully!"
      );

      reset();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
  <div className="grid lg:grid-cols-12 gap-8">

{/* Left Panel */}
<div className="lg:col-span-5 relative rounded-3xl overflow-hidden min-h-[700px]">

  <img
    src="https://images.unsplash.com/photo-1559027615-cd4628902d4a"
    alt="Volunteers"
    className="absolute inset-0 w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-700/60 to-transparent" />

  <div className="relative z-10 h-full flex flex-col justify-end p-8">

    <div className="bg-white/90 px-4 py-2 rounded-full w-fit text-sm font-semibold text-teal-700">
      500+ Volunteers
    </div>

    <h2 className="text-4xl font-bold text-white mt-6">
      Join a community making a difference every day.
    </h2>

    <p className="text-white/90 mt-4">
      Your skills can translate into meaningful impact.
      Help patients and families receive timely care.
    </p>

  </div>
</div>

{/* Form */}
<div className="lg:col-span-7 bg-white rounded-3xl shadow-lg border p-8">

  <div className="mb-8">
    <h1 className="text-4xl font-bold text-blue-600">
      Volunteer Registration
    </h1>

    <p className="text-gray-600 mt-2">
      Join the Jarurat Care volunteer network.
    </p>
  </div>

  <form
    onSubmit={handleSubmit(onSubmit)}
    className="space-y-6"
  >

    <div>
      <label className="block mb-2 font-medium">
        Full Name
      </label>

      <input
        {...register("name", {
          required: true,
        })}
        className="w-full border rounded-xl p-3"
      />
    </div>

    <div className="grid md:grid-cols-2 gap-4">

      <div>
        <label className="block mb-2 font-medium">
          Phone Number
        </label>

        <input
          {...register("phone", {
            required: true,
          })}
          className="w-full border rounded-xl p-3"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          City
        </label>

        <input
          {...register("city", {
            required: true,
          })}
          className="w-full border rounded-xl p-3"
        />
      </div>

    </div>

    <div>
      <label className="block mb-3 font-medium">
        Skills
      </label>

      <div className="grid grid-cols-2 gap-3">

        {skillOptions.map((skill) => (
          <label
            key={skill}
            className="border rounded-xl p-4 cursor-pointer hover:border-blue-500"
          >
            <input
              type="checkbox"
              value={skill}
              {...register("skills")}
              className="mr-2"
            />

            {skill}
          </label>
        ))}

      </div>
    </div>

    <div>
      <label className="block mb-2 font-medium">
        Availability
      </label>

      <select
        {...register("availability", {
          required: true,
        })}
        className="w-full border rounded-xl p-3"
      >
        <option value="">
          Select Availability
        </option>

        <option>Weekdays</option>
        <option>Weekends</option>
        <option>Anytime</option>
      </select>
    </div>

    <button
      disabled={loading}
      className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
    >
      {loading
        ? "Submitting..."
        : "Register as Volunteer"}
    </button>

  </form>

</div>

  </div>
</div>

  );
};

export default VolunteerPage;