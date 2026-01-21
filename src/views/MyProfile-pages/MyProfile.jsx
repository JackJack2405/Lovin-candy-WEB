import ProfileElementA from "../../components/MyProfile/ProfileElementA";
import ProfileElementB from "../../components/MyProfile/ProfileElementB";
import "../../components/MyProfile/ProfileElement.css";
import ProfileElementC from "../../components/MyProfile/ProfileElementC";
import ProfileElementD from "../../components/MyProfile/ProfileElementD";
import { useState, useEffect } from 'react';
import axios from "axios";
import { EditModal } from "../../components/MyProfile/EditModal";

export default function MyProfile() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [triggerFetch, setTriggerFetch] = useState(0);

  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${apiBase}/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setUserData(res.data.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

  fetchData();
}, [apiBase, triggerFetch]);

  const handleSuccess = () => {
      setTriggerFetch(prev => prev + 1);
    };

  return (
    <>
      <div className="my-profile flex flex-col md:flex-row gap-0 p-4 md:p-0">
        <div className="profile-a w-full md:w-75 shrink-0">
          <ProfileElementA />
        </div>

        <div className="flex flex-col gap-5 w-full min-w-0 overflow-hidden md:ml-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-2 md:pl-2 md:pr-6 mt-5  ">
            <h1 className="text-3xl md:text-5xl">My Profile</h1>
            <button
              className="text-lg md:text-2xl bg-white px-4 py-2 md:px-6 md:py-2 rounded-lg shadow-xl hover:text-white hover:bg-[#FF74B1] transition duration-400 hover:scale-105 w-full sm:w-auto "
              onClick={() => setIsEditOpen(true)}
            >
              Edit Profile
            </button>
          </div>
          <div className="profile-b w-full">
            <ProfileElementB data={userData}/>
          </div>
          <div className="profile-c w-full">
            <ProfileElementC data={userData}/>
          </div>
          <div className="profile-d w-full">
            <ProfileElementD />
          </div>

          {isEditOpen && (
        <EditModal 
          key={userData?._id || "edit-modal"}
          userData={userData}
          isOpen={isEditOpen} 
          onClose={() => setIsEditOpen(false)} 
          initialData={userData}
          onSuccess={handleSuccess}
        />
      )}

        </div>
      </div>
    </>
  );
}
