import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { InsertProfile, deleteUser, editUser, fetchUser } from "@/utils/supabaseClient";
import Logo from '../assets/profile_user.gif';
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
const Admin = () => {
  const [user, setUser] = useState({ email: "", fullName: "", phonenumber: "", gender: "", description: "" });
  const [profileImage, setProfileImage] = useState(Logo);
  const [file, setFile] = useState(null);
  const [activeTab, setActiveTab] = useState("edit");
  const [allUsers, setAllUsers] = useState([]); // State to hold all users

  // Handle Profile Upload (For Create New Profile)
  const handleCreateProfile = async () => {
    if (!file) {
      toast.error("Please upload an image first");
      return;
    }

    // Generate file preview
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);

    // Upload new profile
    await InsertProfile(file, user.fullName, user.description, user.phonenumber, user.email, user.gender);
  };

  // Handle Profile Update (Edit Existing User)
  const handleEditProfile = async () => {
    // Update profile in Supabase (without changing image)
    await editUser(null, user.phonenumber, user.fullName, user.email, user.gender, user.description);

    // Notify user
    toast.success("Profile updated successfully!");
};

useEffect(() => {
  const handleFetchAllUsers = async () => {
    const users = await fetchUser();
    setAllUsers(users); // Set the fetched users to state
  };
  handleFetchAllUsers();
}, []); 

const handleDeleteUser = async (email) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this user?");
  if (!confirmDelete) return;

  await deleteUser(email);
  toast.success("User deleted successfully!");

  // Update UI by filtering out the deleted user
  setAllUsers((prevUsers) => prevUsers.filter((user) => user.email !== email));
};


  return (
    <>
      {/* Tab Navigation */}
      <div className="flex justify-center mt-6 shadow-2xl">
        <button
          className={`px-6 py-2 mx-2 text-lg font-semibold ${activeTab === "create" ? "border-b-2 border-black text-black" : "text-gray-500"}`}
          onClick={() => setActiveTab("create")}
        >
          Create
        </button>
        <button
          className={`px-6 py-2 mx-2 text-lg font-semibold ${activeTab === "edit" ? "border-b-2 border-black text-black" : "text-gray-500"}`}
          onClick={() => setActiveTab("edit")}
        >
          Edit
        </button>
        <button
          className={`px-6 py-2 mx-2 text-lg font-semibold ${activeTab === "alluser" ? "border-b-2 border-black text-black" : "text-gray-500"}`}
          onClick={() => setActiveTab("alluser")}
        >
          All User
        </button>
       
      </div>

      {/* Create Profile Section */}
      {activeTab === "create" && (
        <div className="flex flex-col items-center justify-center min-h-screen  text-black p-6">
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <label htmlFor="profile-pic" className="relative cursor-pointer">
                  <div className="relative w-24 h-24">
                    <img src={profileImage} alt="Profile" className="rounded-full w-full h-full border object-cover" />
                  </div>
                </label>
                <input type="file" id="profile-pic" accept="image/*" name="image" onChange={(e) => setFile(e.target.files[0])} className="hidden" />
                <div>
                  <h1 className="text-2xl font-bold">{user.fullName}</h1>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-black mb-2">Username</label>
                  <input type="text" id="username" className="rounded bg-gray-50 border text-gray-900 w-full text-sm p-2.5"
                    placeholder="Full Name" value={user.fullName} onChange={(e) => setUser((prev) => ({ ...prev, fullName: e.target.value }))} />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black mb-2">Email</label>
                  <input type="email" id="email" className="rounded bg-gray-50 border text-gray-900 w-full text-sm p-2.5"
                    placeholder="Email" value={user.email} name="email" onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))} />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-black mb-2">Phone Number</label>
                  <input type="text" id="phone"  className="rounded bg-gray-50 border text-gray-900 w-full text-sm p-2.5"
                    placeholder="Phone Number" value={user.phonenumber} name="phonenumber" onChange={(e) => setUser((prev) => ({ ...prev, phonenumber: e.target.value }))} />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-black mb-2">Description</label>
                  <textarea id="description" className="rounded bg-gray-50 border text-gray-900 w-full text-sm p-2.5"
                    placeholder="Profile Description" value={user.description} onChange={(e) => setUser((prev) => ({ ...prev, description: e.target.value }))}></textarea>
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-black mb-2">Gender</label>
                  <select id="gender" className="rounded bg-gray-50 border text-gray-900 w-full text-sm p-2.5"
                    value={user.gender} onChange={(e) => setUser((prev) => ({ ...prev, gender: e.target.value }))}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <Button type="button" onClick={handleCreateProfile} disabled={!file} className="bg-black rounded text-white px-4 py-2 hover:bg-gray-800 transition">
                Create Profile
              </Button>

             
            </form>
          </div>
        </div>
      )}

{activeTab === "edit" && (
        <div className="flex flex-col items-center justify-center min-h-screen  text-black p-6">
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl p-8">
          <p className="mb-2 text-center text-gray-700">To edit User use the same email</p>
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <label htmlFor="profile-pic" className="relative cursor-pointer">
                  <div className="relative w-24 h-24">
                    <img src={profileImage} alt="Profile" className="rounded-full w-full h-full border object-cover" />
                  </div>
                </label>
                <input type="file" id="profile-pic" accept="image/*" name="image" onChange={(e) => setFile(e.target.files[0])} className="hidden" />
                <div>
                  <h1 className="text-2xl font-bold">{user.fullName}</h1>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-black mb-2">Username</label>
                  <input type="text" id="username" className="rounded bg-gray-50 border text-gray-900 w-full text-sm p-2.5"
                    placeholder="Full Name" value={user.fullName} onChange={(e) => setUser((prev) => ({ ...prev, fullName: e.target.value }))} />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black mb-2">Email</label>
                  <input type="email" id="email" className="rounded bg-gray-50 border text-gray-900 w-full text-sm p-2.5"
                    placeholder="Email" value={user.email} onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))} />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-black mb-2">Phone Number</label>
                  <input type="text" id="phone" className="rounded bg-gray-50 border text-gray-900 w-full text-sm p-2.5"
                    placeholder="Phone Number" value={user.phonenumber} onChange={(e) => setUser((prev) => ({ ...prev, phonenumber: e.target.value }))} />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-black mb-2">Description</label>
                  <textarea id="description" className="rounded bg-gray-50 border text-gray-900 w-full text-sm p-2.5"
                    placeholder="Profile Description" value={user.description} onChange={(e) => setUser((prev) => ({ ...prev, description: e.target.value }))}></textarea>
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-black mb-2">Gender</label>
                  <select id="gender" className="rounded bg-gray-50 border text-gray-900 w-full text-sm p-2.5"
                    value={user.gender} onChange={(e) => setUser((prev) => ({ ...prev, gender: e.target.value }))}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <Button type="button" onClick={handleEditProfile} disabled={!file} className="bg-black rounded text-white px-4 py-2 hover:bg-gray-800 transition">
                Edit Profile
              </Button>

             
            </form>
          </div>
        </div>
      )}

{activeTab === "alluser" && (
        <div className="flex flex-col items-center justify-center min-h-screen text-black p-6">
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl p-8">
            <h1 className="text-2xl font-bold mb-4">All Users</h1>
            <div className="space-y-4">
              {allUsers.length === 0 ? (
                <p>No users found</p>
              ) : (
                allUsers.map((user) => (
                  <div key={user.email} className="flex items-center justify-between space-x-4 border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                        <img src={user.image || Logo} alt="Profile" className="rounded-full w-full h-full object-cover" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold">{user.name}</h2>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    {/* Delete Button */}
                    <Button
                      type="button"
                      onClick={() => handleDeleteUser(user.email)}
                      className=" rounded hover:text-red-950 px-4 py-2 text-red-500 transition"
                    >
                      <MdDelete width={80} height={80} />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
