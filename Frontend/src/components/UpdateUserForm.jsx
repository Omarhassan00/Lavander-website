import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Loader } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import toast from "react-hot-toast";

const roles = ["admin", "customer"];
const genders = ["male", "female"];

const UpdateUserForm = (auser) => {
  const [Theuser, setUser] = useState({
    id: auser.auser._id,
    Frist_Name: auser.auser.Frist_Name,
    Last_Name: auser.auser.Last_Name,
    email: auser.auser.email,
    County: auser.auser.County,
    city: auser.auser.city,
    address: auser.auser.address,
    gender: auser.auser.gender,
    DateOfBirth: auser.auser.DateOfBirth,
    role: auser.auser.role,
    number: auser.auser.number,
  });

  const { updateUser, loading } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(Theuser);
      setUser({
        id : auser.auser._id,
        Frist_Name: "",
        Last_Name: "",
        email: "",
        County: "",
        city: "",
        address: "",
        gender: "male",
        DateOfBirth: "",
        role: "customer",
        number: "",
      });
      window.location.reload();

    } catch {
      toast.error("error updating user");
    }
  };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-purple-800">
        Update User
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="Frist_Name"
            className="block text-sm font-medium text-gray-300"
          >
            Frist Name
          </label>
          <input
            type="text"
            id="Frist_Name"
            name="Frist_Name"
            value={Theuser.Frist_Name}
            onChange={(e) =>
              setUser({ ...Theuser, Frist_Name: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="Last_Name"
            className="block text-sm font-medium text-gray-300"
          >
            Last Name
          </label>
          <input
            type="text"
            id="Last_Name"
            name="Last_Name"
            value={Theuser.Last_Name}
            onChange={(e) =>
              setUser({ ...Theuser, Last_Name: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={Theuser.email}
            onChange={(e) =>
              setUser({ ...Theuser, email: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="County"
            className="block text-sm font-medium text-gray-300"
          >
            Country
          </label>
          <textarea
            id="County"
            name="County"
            value={Theuser.County}
            onChange={(e) =>
              setUser({ ...Theuser, County: e.target.value })
            }
            rows="3"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm
						 py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 
						 focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-300"
          >
            City
          </label>
          <textarea
            id="city"
            name="city"
            value={Theuser.city}
            onChange={(e) =>
              setUser({ ...Theuser, city: e.target.value })
            }
            rows="3"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm
						 py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 
						 focus:border-purple-500"
            required
          />
        </div>

		<div>
          <label
            htmlFor="DateOfBirth"
            className="block text-sm font-medium text-gray-300"
          >
            DateOfBirth
          </label>
          <input
            type="text"
            id="DateOfBirth"
            name="DateOfBirth"
            value={Theuser.DateOfBirth}
            onChange={(e) =>
              setUser({ ...Theuser, DateOfBirth: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-300"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={Theuser.address}
            onChange={(e) =>
              setUser({ ...Theuser, address: e.target.value })
            }
            step="0.01"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm 
						py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500
						 focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="number"
            className="block text-sm font-medium text-gray-300"
          >
            Phone Number
          </label>
          <input
            type="number"
            id="number"
            name="number"
            value={Theuser.number}
            onChange={(e) =>
              setUser({ ...Theuser, number: e.target.value })
            }
            step="0.01"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm 
						py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500
						 focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-300"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={Theuser.gender}
            onChange={(e) =>
              setUser({ ...Theuser, gender: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md
						 shadow-sm py-2 px-3 text-white focus:outline-none 
						 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            required
          >
            <option value="">Select a gender</option>
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-300"
          >
            Membership
          </label>
          <select
            id="role"
            name="role"
            value={Theuser.role}
            onChange={(e) =>
              setUser({ ...Theuser, role: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md
						 shadow-sm py-2 px-3 text-white focus:outline-none 
						 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            required
          >
            <option value="">Select Membership</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
					shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
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
              <PlusCircle className="mr-2 h-5 w-5" />
              Update User
            </>
          )}
        </button>
      </form>
    </motion.div>
    
  );
};
export default UpdateUserForm;
