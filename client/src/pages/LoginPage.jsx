import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginAdmin } from "../services/auth.service";

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response =
        await loginAdmin(data);

      localStorage.setItem(
        "token",
        response.token
      );

      localStorage.setItem(
        "admin",
        JSON.stringify(response.admin)
      );

      toast.success(
        "Login successful"
      );

      navigate("/admin");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6">
          Admin Login
        </h1>

        <div className="mb-4">
          <label>Email</label>

          <input
            {...register("email")}
            className="w-full border p-3 rounded-xl mt-2"
          />
        </div>

        <div className="mb-6">
          <label>Password</label>

          <input
            type="password"
            {...register("password")}
            className="w-full border p-3 rounded-xl mt-2"
          />
        </div>

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-xl"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;