//-----------------------------------------Uncontrolled Component-------------------------------------------------
// "use client";
// import { useRef, FormEvent } from "react";

// export default function Home() {
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (inputRef.current) {
//       console.log(inputRef.current.value);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
//             <input
//             type="text"
//             ref={inputRef}
//             className="w-full p-2 border rounded mb-4"
//             placeholder="Enter name"
//             />
  
//               <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
//                 Submit
//                 </button>
//         </form>
//     </div>
//     );
// }


//----------------------------------------Controlled component-----------------------------------------------------
//api thing
// "use client";

// import { useState, ChangeEvent, FormEvent } from "react";

// interface FormData {
//   name: string;
//   email: string;
//   password: string;
// }

// interface FormErrors {
//   name?: string;
//   email?: string;
//   password?: string;
// }

// export default function LoginPage() {

//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     email: "",
//     password: ""
//   });

//   const [errors, setErrors] = useState<FormErrors>({});
//   const [loading, setLoading] = useState<boolean>(false);
//   const [apiError, setApiError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<boolean>(false);


//   // handle input change
//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };


//   // validate form
//   const validate = (): FormErrors => {
//     const newErrors: FormErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required";
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } 
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Invalid email";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } 
//     else if (formData.password.length < 6) {
//       newErrors.password = "Minimum 6 characters";
//     }

//     return newErrors;
//   };


//   // handle submit
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

//     e.preventDefault();

//     setSuccess(false);
//     setApiError(null);

//     const validationErrors = validate();

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     setErrors({});

//     try {

//       setLoading(true);

//       const response = await fetch(
//         "https://jsonplaceholder.typicode.com/posts",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify(formData)
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Login failed");
//       }

//       const data = await response.json();

//       console.log(data);

//       setSuccess(true);

//       // clear form
//       setFormData({
//         name: "",
//         email: "",
//         password: ""
//       });

//     } 
//     catch (error) {

//       if (error instanceof Error) {
//         setApiError(error.message);
//       }

//     } 
//     finally {
//       setLoading(false);
//     }

//   };


//   return (

//     <div className="flex items-center justify-center min-h-screen bg-gray-100">

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-lg shadow-md w-80"
//       >

//         <h2 className="text-xl font-bold mb-4 text-center">
//           Login Form
//         </h2>


//         {/* Name */}
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full border p-2 mb-1 rounded"
//         />

//         {errors.name && (
//           <p className="text-red-500 text-sm mb-2">
//             {errors.name}
//           </p>
//         )}


//         {/* Email */}
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full border p-2 mb-1 rounded"
//         />

//         {errors.email && (
//           <p className="text-red-500 text-sm mb-2">
//             {errors.email}
//           </p>
//         )}


//         {/* Password */}
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full border p-2 mb-1 rounded"
//         />

//         {errors.password && (
//           <p className="text-red-500 text-sm mb-2">
//             {errors.password}
//           </p>
//         )}


//         {/* Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-500 text-white p-2 rounded mt-2"
//         >
//           {loading ? "Loading..." : "Login"}
//         </button>


//         {/* API error */}
//         {apiError && (
//           <p className="text-red-500 mt-2 text-sm">
//             {apiError}
//           </p>
//         )}


//         {/* success */}
//         {success && (
//           <p className="text-green-600 mt-2 text-sm">
//             Login successful!
//           </p>
//         )}

//       </form>

//     </div>

//   );

// }

"use client";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data: User[] = await response.json();
        setUsers(data);

      } catch (err) {
        if(err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return( <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-semibold">Loading users...</p>
      </div>
      );
  }

  if (error) {
    return (
    <div className="min-h-screen flex items-center justify-center">
    <p className="text-red-500">{error}</p>
    </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No users found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Users List
      </h2>
      <div className="grid gap-4 max-w-3xl mx-auto">
        {users.map(user => (
          <div
           key={user.id} 
          className="bg-white p-4 rounded shadow">

        <h3 className="text-lg font-semibold">{user.name}</h3>
        <p className="text-sm text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-600">{user.username}</p>
          <p className="text-sm text-gray-600">{user.phone}</p>
          </div>
        ))}
    </div>
    </div>
  );
}



{/* //---------------------------------------------------------------------------------------------------------------
// "use client";
// import {useForm} from "react-hook-form";

// interface LoginFormInputs {
//   name: string;
//   email: string;
//   password: string;
// }

// export default function Home() {
//   const { 
//     register,
//     handleSubmit,
//     formState: { errors ,isSubmitting },
//     } = useForm<LoginFormInputs>();

//     const onSubmit = (data: LoginFormInputs) => {
//       console.log("Form Data:", data) ;
//     };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-96">
//           <h2 className="text-2xl font-bold mb-4">Login Form</h2>

//           <input
//             type="text"
//             placeholder="Enter name"
//             {...register("name", { required: "Name is required" })}
//             className="w-full p-2 border rounded mb-4"
//             />

//             {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>}

//             <input
//             type="email"
//             placeholder="Enter email"
//             {...register("email", { required: "Email is required", 
//             pattern: { value: /\S+@\S+\.\S+/, message: "Email is invalid" } })}
//             className="w-full p-2 border rounded mb-4"
//             />

//             {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}
        
//             <input
//             type="password"
//             placeholder="Enter password"
//             {...register("password", { required: "Password is required", 
//             minLength: { value: 6, message: "Password must be at least 6 characters" } })}
//             className="w-full p-2 border rounded mb-4"
//             />

//             {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>} 
//               <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white p-2 rounded">
//                 {isSubmitting ? "Submitting..." : "Submit"}
//                 </button>
//         </form>
//     </div>
//     );
// } */}