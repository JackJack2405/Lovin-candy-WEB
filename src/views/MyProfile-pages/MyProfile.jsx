import ProfileElementA from "../../components/MyProfile/ProfileElementA";
import ProfileElementB from "../../components/MyProfile/ProfileElementB";
import "../../components/MyProfile/ProfileElement.css";
import ProfileElementC from "../../components/MyProfile/ProfileElementC";
import ProfileElementD from "../../components/MyProfile/ProfileElementD";

export default function MyProfile() {
  return (
    <>
      <div className="my-profile">
        <div className="profile-a">
          <ProfileElementA />
        </div>

        <div className="flex flex-col gap-5 w-full min-w-0 overflow-hidden">
          <div className="flex justify-between">
            <h1 className="text-5xl ml-6 mt-5">My Profile</h1>
            <button
              className="mr-5 mt-5 text-2xl bg-white px-6 py-2 rounded-lg shadow-xl hover:text-white hover:bg-[#FF74B1] transition duration-400 hover:scale-105"
              onClick={() => {}}
            >
              Edit Profile
            </button>
          </div>
          <div className="profile-b">
            <ProfileElementB />
          </div>
          <div className="profile-c">
            <ProfileElementC />
          </div>
          <div className="profile-d">
            <ProfileElementD />
          </div>
        </div>
      </div>
    </>
  );
}
