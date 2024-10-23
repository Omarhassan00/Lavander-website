import { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader,
  PhoneCall,
  Home,
  LocateFixedIcon,
  Calendar,
  Earth,
} from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";
import ShowPassword from "../stores/ShowPassword";
import ShowPass from "../stores/ShowPass";
import PasswordChecklist from "react-password-checklist";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    Frist_Name: "",
    Last_Name: "",
    County: "",
    city: "",
    address: "",
    DateOfBirth: "",
    gender: "male",
    number: "",
    email: "",
    setPassword: "",
    setPasswordAgain: "",
  });

  const { signup, loading } = useUserStore();
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="flex flex-col justify-center py-20 sm:px-6 lg:px-8">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-purple-800">
          Create your account
        </h2>
      </motion.div>

      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 ">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between  w-full ">
              <div>
                <label
                  htmlFor="Frist_Name"
                  className="flex text-sm font-medium text-gray-300"
                >
                  Frist Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="Frist_Name"
                    type="text"
                    required
                    value={formData.Frist_Name}
                    onChange={(e) =>
                      setFormData({ ...formData, Frist_Name: e.target.value })
                    }
                    className="flex w-44 px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="Frist Name"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="Last_Name"
                  className="flex text-sm font-medium text-gray-300"
                >
                  Last Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="Last_Name"
                    type="text"
                    required
                    value={formData.Last_Name}
                    onChange={(e) =>
                      setFormData({ ...formData, Last_Name: e.target.value })
                    }
                    className="flex w-44 px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="Last Name"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between  w-full ">
              <div>
                <label
                  htmlFor="County"
                  className="block text-sm font-medium text-gray-300"
                >
                  County
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Earth
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="County"
                    type="text"
                    required
                    value={formData.County}
                    onChange={(e) =>
                      setFormData({ ...formData, County: e.target.value })
                    }
                    className="block w-44 px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="Country"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-300"
                >
                  city
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Home
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="city"
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="block w-44 px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="City"
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-300"
              >
                address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LocateFixedIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="address"
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="Address"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-300"
              >
                gender
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <select
                  id="gender"
                  required
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="block w-full px-8 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                >
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="DateOfBirth"
                className="block text-sm font-medium text-gray-300"
              >
                Date-Of-Birth
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="DateOfBirth"
                  type="date"
                  required
                  value={formData.DateOfBirth}
                  onChange={(e) =>
                    setFormData({ ...formData, DateOfBirth: e.target.value })
                  }
                  className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="number"
                className="block text-sm font-medium text-gray-300"
              >
                Number
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PhoneCall
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="number"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]{11}"
                  maxLength={11}
                  required
                  value={formData.number}
                  onChange={(e) =>
                    setFormData({ ...formData, number: e.target.value })
                  }
                  className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="Enter Your Phone Number"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className=" block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-purple-500 
									 focus:border-purple-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="relative block text-sm font-medium text-gray-300">
                  <label htmlFor="setPassword">Password:</label>
                  <div className="flex absolute inset-y-0 top-6 left-0 pl-3 items-center pointer-events-none">
                    <Lock
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    className=" block w-full px-3 py-2 pl-10 bg-gray-700 border
			border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    type="password"
                    id="setPassword"
                    placeholder="••••••••"
                    required
                    value={formData.setPassword}
                    // onChange={(e) =>
                    // setFormData(...formData ),
                    // setPassword(e.target.value),
                    // }
                    onChange={(e) => {
                      setFormData({ ...formData, setPassword: e.target.value }),
                        setPassword(e.target.value);
                    }}
                  />
                  <ShowPassword />
                </div>
              </div>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="relative block text-sm font-medium text-gray-300">
                  <label htmlFor="setPasswordAgain" className="mb-3 ">
                    Confirm Password:
                  </label>
                  <div className="flex absolute inset-y-0 top-6 left-0 pl-3 items-center pointer-events-none">
                    <Lock
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    className=" block w-full px-3 py-2 pl-10 bg-gray-700 border
			border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    type="password"
                    id="setPasswordAgain"
                    placeholder="••••••••"
                    required
                    value={formData.setPasswordAgain}
                    // onChange={(e) =>
                    // 	setFormData(...formData ),
                    // 	setPasswordAgain(e.target.value),
                    // }
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        setPasswordAgain: e.target.value,
                      }),
                        setPasswordAgain(e.target.value);
                    }}
                  />
                  <ShowPass />
                </div>
              </div>
              <PasswordChecklist
                rules={[
                  "minLength",
                  "specialChar",
                  "number",
                  "capital",
                  "match",
                ]}
                minLength={8}
                value={password}
                valueAgain={passwordAgain}
                messages={{
                  minLength: "Password has more than 8 characters.",
                  specialChar: "Password has special characters.",
                  number: "Password has a number.",
                  capital: "Password has a capital letter.",
                  match: "Password match.",
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent 
							rounded-md shadow-sm text-sm font-medium text-white bg-purple-600
							 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-purple-500 transition duration-150 ease-in-out disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader
                    className="mr-2 h-5 w-5 animate-spin"
                    aria-hidden="true"
                  />
                  Loading...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-5 w-5" aria-hidden="true" />
                  Sign up
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-purple-400 hover:text-purple-300"
            >
              Login here <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
export default SignUpPage;
