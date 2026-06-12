import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createSupportRequest } from "../services/support.service";
import { useState } from "react";

const SupportPage = () => {
const [loading, setLoading] = useState(false);

const {
register,
handleSubmit,
reset,
watch,
formState: { errors },
} = useForm();

const description = watch("description", "");

const onSubmit = async (data) => {
try {
setLoading(true);

  await createSupportRequest(data);

  toast.success(
    "Support request submitted successfully!"
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

return ( <div className="max-w-7xl mx-auto px-6 py-12"> <div className="mb-10"> <h1 className="text-4xl lg:text-5xl font-bold">
Patient Support Request </h1>

    <p className="text-gray-600 mt-3 max-w-2xl">
      Please provide details about the patient and
      the assistance required. Our team will review
      your request promptly.
    </p>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

    {/* FORM */}
    <div className="lg:col-span-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-3xl shadow-lg border p-8 space-y-6"
      >

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">
              Patient Full Name
            </label>

            <input
              {...register("name", {
                required: "Name is required",
              })}
              className="w-full border rounded-xl p-3"
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Age
            </label>

            <input
              type="number"
              {...register("age", {
                required: "Age is required",
              })}
              className="w-full border rounded-xl p-3"
            />

            {errors.age && (
              <p className="text-red-500 text-sm mt-1">
                {errors.age.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">
              Contact Phone
            </label>

            <input
              {...register("phone", {
                required:
                  "Phone number is required",
              })}
              className="w-full border rounded-xl p-3"
            />

            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Support Needed
            </label>

            <select
              {...register("supportNeeded", {
                required:
                  "Please select a support type",
              })}
              className="w-full border rounded-xl p-3"
            >
              <option value="">
                Select category...
              </option>

              <option>
                Medical Assistance
              </option>

              <option>
                Medicine Delivery
              </option>

              <option>
                Patient Transportation
              </option>

              <option>
                Elderly Care
              </option>

              <option>
                Mental Health Support
              </option>

              <option>
                Financial Assistance
              </option>

              <option>
                Emergency Help
              </option>

              <option>
                Other
              </option>
            </select>

            {errors.supportNeeded && (
              <p className="text-red-500 text-sm mt-1">
                {errors.supportNeeded.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Address
          </label>

          <textarea
            rows={3}
            {...register("address", {
              required:
                "Address is required",
            })}
            className="w-full border rounded-xl p-3"
          />

          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Detailed Description
          </label>

          <textarea
            rows={6}
            maxLength={500}
            {...register("description", {
              required:
                "Description is required",
            })}
            className="w-full border rounded-xl p-3"
            placeholder="Describe the patient's condition and support needed..."
          />

          <div className="flex justify-between mt-2">
            {errors.description ? (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            ) : (
              <span />
            )}

            <p className="text-sm text-gray-500">
              {description.length}/500
            </p>
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          {loading
            ? "Submitting..."
            : "Submit Request"}
        </button>
      </form>
    </div>

    {/* AI PANEL */}
    <div className="lg:col-span-4">
      <div className="rounded-3xl border border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-100 p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-600 text-white rounded-full p-3">
            ✨
          </div>

          <h3 className="text-2xl font-bold text-blue-600">
            AI-Powered Assistance
          </h3>
        </div>

        <p className="text-gray-700 mb-6">
          Our Gemini AI analyzes requests to help
          volunteers respond faster and prioritize
          urgent cases.
        </p>

        <ul className="space-y-4">
          <li>✅ Summarizes patient needs</li>

          <li>✅ Identifies urgency level</li>

          <li>✅ Categorizes support requests</li>

          <li>✅ Recommends volunteer actions</li>
        </ul>
      </div>

      <div className="mt-6 bg-red-50 border border-red-200 rounded-3xl p-6">
        <h4 className="font-bold text-red-600">
          Emergency Help
        </h4>

        <p className="mt-2 text-gray-700">
          For urgent medical situations,
          contact emergency services
          immediately.
        </p>

        <p className="font-bold mt-3 text-red-600">
          1-800-JARURAT
        </p>
      </div>
    </div>

  </div>
</div>

);
};

export default SupportPage;
