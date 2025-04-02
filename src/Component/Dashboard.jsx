import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardNavbar from "./DashboardNavbar";
import { fetchUser } from "@/utils/supabaseClient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdOutlineVerified, MdOutlineMail, MdTimelapse } from "react-icons/md";
import { FaTransgender } from "react-icons/fa6";
import { FcAbout } from "react-icons/fc";
import { FaPhoneAlt } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const defaultPosition = [51.505, -0.09];

  useEffect(() => {
    const fetchProfiles = async () => {
      const data = await fetchUser();
      if (data) setUsers(data);
    };
    fetchProfiles();
  }, []);

  return (
    <>
      <DashboardNavbar />
      <div className="p-6 text-black">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-2xl p-8">
          <div className="mb-8">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by username or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4 p-2 border rounded-none shadow-2xl w-full"
            />
            <div className="space-y-6">
              {/* Profile Cards */}
              {users
                .filter(
                  (user) =>
                    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((user) => (
                  <div
                    key={user.id}
                    className="p-4 border-none rounded-lg shadow-2xl bg-white flex items-center gap-4"
                  >
                    {/* Profile Image */}
                    <img
                      className="w-14 h-14 rounded-full"
                      src={user.image || "/default-profile.png"}
                      alt="Profile"
                    />
                    {/* User Info */}
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold">{user.name}</h2>
                      <p className="text-gray-500 text-sm">{user.email}</p>
                    </div>

                    {/* ShadCN UI Dialog with Framer Motion */}
                    <Dialog>
                      <DialogTrigger
                        className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-none"
                        onClick={() => setSelectedUser(user)}
                      >
                        View
                      </DialogTrigger>

                      <AnimatePresence>
                        {selectedUser && (
                          <DialogContent className="max-w-lg bg-white border-none rounded-xl shadow-2xl overflow-hidden">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="max-h-[80vh] overflow-y-auto px-6 pb-6">
                              {/* Dialog Header */}
                              <DialogHeader>
                                <div className="flex justify-between items-start">
                                  <div>
                                    <DialogTitle className="text-2xl flex gap-2 font-bold text-gray-800">
                                      {selectedUser.name}
                                      <MdOutlineVerified className="mt-1.5 text-blue-600" />
                                    </DialogTitle>
                                    <DialogDescription className="text-gray-500 flex items-center gap-1 mt-1">
                                      <span>User Profile</span>
                                    </DialogDescription>
                                  </div>
                                </div>
                              </DialogHeader>
                        
                              {/* User Profile Content */}
                              <div className="relative -mt-7 mb-4">
                                <img
                                  className="w-24 h-24 mx-auto rounded-full border-4 border-white shadow-lg object-cover"
                                  src={selectedUser.image || "/default-profile.png"}
                                  alt="Profile"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/default-profile.png";
                                  }}
                                />
                              </div>
                        
                              {/* User Info Grid */}
                              <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <p className="text-xs font-medium text-gray-500 uppercase flex gap-2 tracking-wider">
                                    <FaPhoneAlt className="mt-1" /> Email
                                  </p>
                                  <p className="text-gray-800 text-sm font-medium">
                                    {selectedUser.phonenumber || "Not provided"}
                                  </p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <p className="text-xs font-medium text-gray-500 uppercase flex gap-2 tracking-wider">
                                    <MdOutlineMail className="mt-1" /> Phone
                                  </p>
                                  <p className="text-gray-800 text-sm font-medium">
                                    {selectedUser.email}
                                  </p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <p className="text-xs font-medium text-gray-500 uppercase flex gap-2 tracking-wider">
                                    <FaTransgender className="mt-1" /> Gender
                                  </p>
                                  <p className="text-gray-800 text-sm font-medium capitalize">
                                    {selectedUser.gender || "Not specified"}
                                  </p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <p className="text-xs font-medium text-gray-500 uppercase flex gap-2 tracking-wider">
                                    <MdTimelapse className="mt-1" /> Member Since
                                  </p>
                                  <p className="text-gray-800 text-sm font-medium">
                                    {selectedUser.created_at
                                      ? new Date(selectedUser.created_at).toLocaleDateString()
                                      : "N/A"}
                                  </p>
                                </div>
                              </div>
                        
                              {/* User Description */}
                              <div className="mb-6">
                                <h3 className="text-sm font-medium text-gray-500 flex gap-2 uppercase tracking-wider mb-2">
                                  <FcAbout className="mt-1" /> About
                                </h3>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <p className="text-gray-700">
                                    {selectedUser.description || "No description provided."}
                                  </p>
                                </div>
                              </div>
                        
                              {/* Map Section */}
                              <div className="mb-6">
                                <h3 className="text-sm font-medium text-gray-500 flex gap-2 uppercase tracking-wider mb-2">
                                  📍 Location
                                </h3>
                                <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                                  <MapContainer
                                    center={
                                      selectedUser.lat ? [selectedUser.lat, selectedUser.lng] : defaultPosition
                                    }
                                    zoom={13}
                                    style={{ height: "100%", width: "100%" }}
                                  >
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    {selectedUser.lat && selectedUser.lng && (
                                      <Marker position={[selectedUser.lat, selectedUser.lng]}>
                                        <Popup>{selectedUser.name}'s Location</Popup>
                                      </Marker>
                                    )}
                                  </MapContainer>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </DialogContent>
                        
                        )}
                      </AnimatePresence>
                    </Dialog>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
