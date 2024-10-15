import { motion } from "framer-motion";
import { LucideUserRoundPen, UserCircle2, UserX2Icon } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import UpdateUserForm from "./UpdateUserForm";
import { useState } from "react";

const UsersList = () => {
  const { deleteUser, users } = useUserStore();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const handleEditClick = (auser) => {
    setSelectedUser(auser);
    setShowUpdateForm(true);
  };
  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <table className=" min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              User
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Gender
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              MemberShip
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {users?.map((auser) => (
            <tr key={auser._id} className="hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <UserCircle2 className="h-10 w-10" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-white">
                      {auser.Frist_Name} {auser.Last_Name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  {auser.email}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">{auser.gender}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">{auser.role}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => deleteUser(auser._id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <UserX2Icon className="h-5 w-5" />
                </button>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => handleEditClick(auser)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  <LucideUserRoundPen className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showUpdateForm && <UpdateUserForm auser={selectedUser} />}
    </motion.div>
  );
};
export default UsersList;
