import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


const schema = yup.object({
  name: yup
    .string()
    .required("name is required ")
    .min(2, "name should be at least 2 characters")
    .lowercase(),
  email: yup.string().required("email is required"),
});


function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });


  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Form Validation
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div>
            <input
              {...register("name")}
              type="text"
              placeholder="Enter Name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors?.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors?.name?.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Enter Email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors?.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors?.email?.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("age", {
                min: { value: 18, message: "Age must be at least 18" },
                max: { value: 150, message: "Invalid age" },
              })}
              type="number"
              placeholder="Enter Age"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors?.age && (
              <p className="text-red-500 text-sm mt-1">
                {errors?.age?.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
