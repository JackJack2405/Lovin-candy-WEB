import ProfileElementA from "../../components/MyProfile/ProfileElementA";
import '../../components/MyProfile/ProfileElement.css';
import ProfileOrder from "../../components/MyProfile/ProfileOrder";

export default function MyOrder() {
  return (
    <>
      <div className="my-profile">
        <div className="profile-a">
          <ProfileElementA />
        </div>

        <div className="flex flex-col gap-5 w-full">
            <h1 className="text-5xl ml-6 mt-5">My Order</h1>

          <div className="profile-c">
            <ProfileOrder />
          </div>
        </div>
      </div>
    </>
  )
}