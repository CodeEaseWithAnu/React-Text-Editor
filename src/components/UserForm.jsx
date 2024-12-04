import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Editor } from "@tinymce/tinymce-react";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone Number must be 10 digits")
    .required("Phone Number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  age: Yup.number()
    .typeError("Age must be a number")
    .min(18, "You must be at least 18 years old")
    .max(120, "Age must be less than or equal to 120")
    .required("Age is required"),
  gender: Yup.string().required("Gender is required"),
  messageCntrl: Yup.string().required("Message is required"),
});

const UserForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const handleEditorChange = (content) => {
    console.log("Content was updated:", content);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">React Hook Form with TinyMCE</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block mb-1">First Name</label>
          <input
            {...register("firstName")}
            className="w-full border px-3 py-2"
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block mb-1">Last Name</label>
          <input
            {...register("lastName")}
            className="w-full border px-3 py-2"
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1">Email</label>
          <input
            {...register("email")}
            className="w-full border px-3 py-2"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block mb-1">Phone Number</label>
          <input
            {...register("phoneNumber")}
            className="w-full border px-3 py-2"
            placeholder="Enter your phone number"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1">Password</label>
          <input
            {...register("password")}
            type="password"
            className="w-full border px-3 py-2"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-1">Confirm Password</label>
          <input
            {...register("confirmPassword")}
            type="password"
            className="w-full border px-3 py-2"
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Age */}
        <div>
          <label className="block mb-1">Age</label>
          <input
            {...register("age")}
            type="number"
            className="w-full border px-3 py-2"
            placeholder="Enter your age"
          />
          {errors.age && (
            <p className="text-red-500 text-sm">{errors.age.message}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block mb-1">Gender</label>
          <select
            {...register("gender")}
            className="w-full border px-3 py-2"
          >
            <option value="">Select your gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block mb-1">Message</label>
          <Controller
             name="messageCntrl"
             control={control}
             defaultValue=""
             rules={{ required: "Message is required" }}
            render={({ field }) => (
              <Editor
                apiKey="i0xxkif0e99vtoztc6r7nh0tht8vk1de2ujjme4jfu5wa645"
                init={{
                  plugins: [
                    // Core editing features
                   'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',                    
                   // Early access to document converters
                  'importword', 'exportword', 'exportpdf'
                  ],
                  toolbar: "undo redo | bold italic | alignleft aligncenter alignright | code",
                }}
                initialValue="Welcome to TinyMCE!"
                onEditorChange={(content) => field.onChange(content)}
              />
            )}
          />
          {errors.messageCntrl && (
            <p className="text-red-500 text-sm">{errors.messageCntrl.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
