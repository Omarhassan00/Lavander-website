import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Lock ,Loader, UserCog2} from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import ShowPass from "../stores/ShowPass";
import ShowPassword from "../stores/ShowPassword";
import PasswordChecklist from "react-password-checklist";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#1F2937",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


export default function BtnEditPass(email) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    const [formData, setFormData] = useState({
      old_password: "",
      setPassword: "",
      setPasswordAgain: "",
    });
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    
    const { updatePass, loading } = useUserStore();
    
    const handleSubmit = (e) => {
      e.preventDefault();
      updatePass(formData, email);

    };
    return (
    <div>
      <Button
        style={{
          listStyle: "none",
          color: "white",
          width: "500px",
          height: "100%",
          paddingTop: "10px",
        }}
        onClick={handleOpen}
      >
        Edit On Password
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <div id="parent-modal-title0">
            <div>
              <label
                htmlFor="old_password"
                className="block text-sm font-medium py-2 text-gray-300 gap-2"
              >
                <Lock
                  className="h-5 w-5 text-gray-600 inline"
                  aria-hidden="true"
                />{" "}
                Old Password
              </label>

              <input
                type="password"
                id="old_password"
                name="old_password"
                value={formData.old_password}
                onChange={(e) =>
                  setFormData({ ...formData, old_password: e.target.value })
                }
                step="0.01"
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm 
						py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500
						 focus:border-purple-500"
                required
              />
            </div>
          </div>
          {/* <div id="parent-modal-title1">
            <div>
              <label
                htmlFor="new_password"
                className="block text-sm font-medium py-2 text-gray-300 gap-2"
              >
                <Lock
                  className="h-5 w-5 text-gray-600 inline"
                  aria-hidden="true"
                />{" "}
                New Password
              </label>

              <input
                type="password"
                id="new_password"
                name="new_password"
                value={formData.new_password}
                onChange={(e) =>
                  setFormData({ ...formData, new_password: e.target.value })
                }
                step="0.01"
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm 
						py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500
						 focus:border-purple-500"
                required
              />
            </div>
          </div>
          <div id="parent-modal-title2" className="mb-11" >
            <div>
              <label
                htmlFor="confirmnewPassword"
                className="block text-sm font-medium py-2 text-gray-300 gap-2"
              >
                <Lock
                  className="h-5 w-5 text-gray-600 inline"
                  aria-hidden="true"
                />{" "}
                Confirm New Password
              </label>

              <input
                type="password"
                id="confirmnewPassword"
                name="confirmnewPassword"
                value={formData.confirmnewPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmnewPassword: e.target.value,
                  })
                }
                step="0.01"
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm 
						py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500
						 focus:border-purple-500"
                required
              />
            </div> */}
          {/* </div> */}

          <div>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="relative block text-sm font-medium text-gray-300">
                  <label htmlFor="setPassword">New password:</label>
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
                    Confirm new Password:
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
                style={{color:"white", margin:"10px 0px"}}
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
          onClick={handleSubmit}

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
                <UserCog2 className="mr-2 h-5 w-5" aria-hidden="true"/>
                Change Password
              </>
            )}
          </button>
        </Box>
      </Modal>
    </div>
  );
}
