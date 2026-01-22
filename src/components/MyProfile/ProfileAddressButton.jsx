import "./ProfileElement.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileAddressButton ({ data, onSuccess }) {

  const apiBase = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: data?.address?.fullName || "",
    phone: data?.address?.phone || "",
    streetAddress: data?.address?.streetAddress || "",
    province: data?.address?.province || "",
    district: data?.address?.district || "",
    subDistrict: data?.address?.subDistrict || "",
    postalCode: data?.address?.postalCode || ""
  });

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`${apiBase}/users/update-address`, {
        address: formData
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        if (onSuccess) onSuccess();
        navigate("/profile/address");
      }
    } catch (err) {
      console.error("Update Address Error:", err);
    }
  };


  return (
    <div className='element-b mb-10'>
      <div className="w-full">
        <label className="flex flex-col">
          Name - Surname
          <input
          name="fullName"
          type="text"
          className="border-[#C4C4C4] border rounded-lg max-w-210 min-w-120 mr-5 mt-2 pl-2 pt-1 pb-1"
          maxLength={100}
          value={formData.fullName || ""}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          >
          </input>
        </label>

        <label className="flex flex-col mt-3">
          Phone Number
          <input 
          type="tel"
          className="border-[#C4C4C4] border rounded-lg max-w-210 min-w-120 mr-5 mt-2 pl-2 pt-1 pb-1"
          maxLength={20}
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          >
          </input>
        </label>

        <label className="flex flex-col mt-3">
          Address
          <input 
          type="text"
          className="border-[#C4C4C4] border rounded-lg max-w-210 min-w-120 mr-5 mt-2 pl-2 pt-1 pb-1"
          maxLength={200}
            value={formData.streetAddress}
            onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
            >
          </input>
        </label>

        <div className="flex">
          <label className="flex flex-col mt-3">
            Province
            <input 
            type="text"
            className="border-[#C4C4C4] border rounded-lg max-w-102 min-w-80 mr-5 mt-2 pl-2 pt-1 pb-1"
            maxLength={50}
            value={formData.province}
            onChange={(e) => setFormData({ ...formData, province: e.target.value })}
            >
            </input>
          </label>

          <label className="flex flex-col mt-3">
            District
            <input 
            type="text"
            className="border-[#C4C4C4] border rounded-lg max-w-102 min-w-80 mr-5 mt-2 pl-2 pt-1 pb-1"
            maxLength={50}
            value={formData.district}
            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
            >
            </input>
          </label>
        </div>

        <div className="flex">
          <div className="flex flex-col mt-3">
            Sub-District
            <input 
            type="text"
            className="border-[#C4C4C4] border rounded-lg max-w-102 min-w-80 mr-5 mt-2 pl-2 pt-1 pb-1"
            maxLength={50}
            value={formData.subDistrict}
            onChange={(e) => setFormData({ ...formData, subDistrict: e.target.value })}
            >
            </input>
          </div>
          <div className="flex flex-col mt-3">
            Postal Code
            <input 
            type="number"
            className="border-[#C4C4C4] border rounded-lg max-w-102 min-w-80 mr-5 mt-2 pl-2 pt-1 pb-1"
            maxLength={20}
            value={formData.postalCode}
            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            >
            </input>
          </div>
        </div>

        <button 
          className="bg-yellow-200 px-5 py-2 text-xl rounded-2xl mt-7 mb-7 cursor-pointer hover:scale-103 hover:bg-yellow-300"
          onClick={handleUpdate}>
          Save Address
        </button>
      </div>
    </div>
  )
}