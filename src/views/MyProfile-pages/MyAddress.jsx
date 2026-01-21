import ProfileElementA from "../../components/MyProfile/ProfileElementA";
import '../../components/MyProfile/ProfileElement.css';
import ProfileAddress from "../../components/MyProfile/ProfileAddress";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";

export default function MyAddress() {

  const [userData, setUserData] = useState(null);
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${apiBase}/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(res.data.data);
      } catch (err) {
        console.error("Fetch address error:", err);
      }
    };
    fetchAddress();
  }, [apiBase]);

  return (
    <>
      <div className="my-profile">
        <div className="profile-a">
          <ProfileElementA />
        </div>

      <div className="flex flex-col gap-3 w-full">
        <div className="flex justify-between items-end px-6 mt-5">
            <h1 className="text-5xl">My Address</h1>
            <Link 
            to="/profile/address/edit"
            className="bg-yellow-200 px-5 py-2 rounded-lg text-2xl font-bold hover:bg-yellow-300 transition-colors cursor-pointer mb-2">
              Edit Address
            </Link>
          </div>
          <div className="profile-c">
            <ProfileAddress data={userData}/>
          </div>
      </div>
    </div>
  </>
  )
}